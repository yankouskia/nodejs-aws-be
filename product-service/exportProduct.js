import AWS from 'aws-sdk';
import { sendToDB } from './sendToDB';

export const exportProduct = async e => {
  const sns = new AWS.SNS();

  const records = e.Records;
  if (!records || records.length === 0) {
    return {
      statusCode: 202,
    };
  }

  await Promise.all(records.map(async record => {
    try {
      const potentialProduct = JSON.parse(record.body);
      const productId = await sendToDB(potentialProduct);

      try {
        const result = await sns.publish({
          Subject: 'New product added',
          Message: record.body,
          TopicArn: process.env.SNS_TOPIC,
          MessageAttributes: {
            status: 'success',
          },
        }).promise();
        console.log('Message ', result, ' was sent');
      } catch (e) {
        console.log('Message was not sent because of ', e);
      }

      console.log('Created product id', productId);
    } catch (error) {
      console.log(`Unable to parse product ${error}`);
      try {
        const result = await sns.publish({
          Subject: 'Adding new product failure',
          Message: record.body,
          TopicArn: process.env.SNS_TOPIC,
          MessageAttributes: {
            status: 'failure',
          },
        }).promise();
        console.log('Message ', result, ' was sent');
      } catch (e) {
        console.log('Message was not sent because of ', e);
      }
    }
  }))

  return {
    statusCode: 202,
  };
}
