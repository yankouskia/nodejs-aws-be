const AWS = require('aws-sdk');
const BUCKET = 'product-service.imported-products';

module.exports.importProductsFile = async function(event) {
  const s3 = new AWS.S3({ region: 'eu-west-1' });
  const filename = event['queryStringParameters']['name'] || 'products';
  const productsFilePath = `uploaded/${filename}.csv`;

  const params = {
    Bucket: BUCKET,
    Key: productsFilePath,
    Expires: 120,
    ContentType: 'text/csv',
  };

  const uploadURL = await new Promise((resolve, reject) => {
    s3.getSignedUrl('putObject', params, function (err, url) {
      if (err) {
        reject(err)
      }
      resolve(url)
    })
  })

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    },
    body: JSON.stringify({ uploadURL }),
  }
};

module.exports.parseProductsFile = async function(event) {
  const s3 = new AWS.S3({ region: 'eu-west-1' });

  await Promise.all(event.Records.map(record => {
    console.log('Record key: ', record.s3.object.key);
    const params = {
      Bucket: BUCKET,
      Key: record.s3.object.key,
    }

    const readStream = s3.getObject(params).createReadStream();

    const parsedParams = {
      Bucket: BUCKET,
      Key: record.s3.object.key.replace('uploaded', 'parsed'),
      Body: readStream
    };

    return new Promise((resolve, reject) => {
      s3.upload(parsedParams, function(err, data) {
        readStream.destroy();

        if (err) {
          return reject(err);
        }

        return resolve(data);
      });
    });
  }))

  return {
    statusCode: 202,
  }
};
