import { sendToDB } from './sendToDB';

export const createProduct = async event => {
  try {
    console.log('Event Path Parameters', event.body);
    const requestBody = JSON.parse(event.body);

    const productId = await sendToDB(requestBody);

    if (!productId) {
      return {
        statusCode: 400,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true,
        },
        body: JSON.stringify({ message: 'Product was not added' }),
      };
    }

    console.log('Created product id', productId);

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify({ product: {
        description,
        title,
        price,
        count,
        id: productId,
      } }),
    };
  } catch (e) {
    console.log('Database or Server Error', e);

    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify({ message: 'Error while posting data' }),
    };
  }
};
