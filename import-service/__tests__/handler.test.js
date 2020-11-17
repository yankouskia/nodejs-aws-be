const { importProductsFile } = require('../handler');

jest.mock('aws-sdk', () => ({
  S3: jest.fn(() => ({
    getSignedUrl: (_, __, cb) => {
      cb(null, 'presigned-url');
    },
  })),
}));

describe('importProductsFile', () => {
  test('incorrect event returns 500', async () => {
    const result = await importProductsFile({ queryStringParameters: null });

    expect(result.statusCode).toEqual(500);
  });

  test('correct event returns url', async () => {
    const result = await importProductsFile({ queryStringParameters: { name: 'products-file-name' } });

    expect(result.statusCode).toEqual(200);
    expect(result.body).toMatchSnapshot();
  });
});
