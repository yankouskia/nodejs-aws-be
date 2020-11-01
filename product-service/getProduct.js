import { loadProduct } from './db';

export const getProduct = async event => {
  try {
    console.log('Event Path Parameters', event.pathParameters);

    const { id } = event.pathParameters;
    const product = await loadProduct(id);

    if (!product) {
      return {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true,
        },
        body: JSON.stringify({ product, message: 'Product not found by passed ID' }),
      };
    }

    console.log('Found result', product);

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify({ product }),
    };
  } catch (e) {
    console.log('Database or Server Error', e);

    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify({ message: 'Error while reading data' }),
    };
  }
};
