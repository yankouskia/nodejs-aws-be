import { loadProducts } from './db';

export const getProducts = async event => {
  try {
    const products = await loadProducts();

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify({ products }),
    };
  } catch (e) {
    console.log('Database Error', e);

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
