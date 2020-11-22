import { exportProduct } from '../exportProduct';
import { sendToDB } from '../sendToDB';

jest.mock('aws-sdk', () => ({
  SNS: jest.fn(() => ({
    publish: jest.fn(() => ({
      promise: jest.fn(),
    }))
  })),
}));

jest.mock('../sendToDB', () => ({
  sendToDB: jest.fn(),
}));

describe('exportProduct', () => {
  it('no records does not throw errors', async () => {
    const result = await exportProduct({ Records: null });
    expect(result.statusCode).toEqual(202);
  });

  it('goes through records and push to DB', async () => {
    const result = await exportProduct({ Records: [{ body: '{"hello":1}' }, { body: '{"hello":2}' }] });
    expect(sendToDB).toHaveBeenCalledTimes(2);
    expect(result.statusCode).toEqual(202);
  });
});
