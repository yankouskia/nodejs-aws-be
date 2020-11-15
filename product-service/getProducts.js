import { createClient } from './db/connect';
import getProductsQuery from './db/select-products.sql';

export const getProducts = async event => {
  console.log('GET PRODUCT LAMBDA LAUNCHED WITH EVENT: ', event);

  try {
    const client = await createClient();
    const dbResponse = await client.query(getProductsQuery);
    const products = dbResponse.rows;

    client.end();

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify({ products }),
    };
  } catch (e) {
    console.log('DATABASE ERROR:', e);

    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify({ message: 'Error while reading or connecting to db' }),
    };
  }
};
