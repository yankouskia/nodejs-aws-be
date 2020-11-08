import { client } from './db/connect';
import createProductQuery from './db/create-product.sql';

export const createProduct = async event => {
  try {
    console.log('Event Path Parameters', event.body);
    const requestBody = JSON.parse(event.body);

    const {
      description,
      title,
      price,
      count,
    } = requestBody;

    if (
      typeof description !== 'string' ||
      typeof title !== 'string' ||
      typeof price !== 'number' ||
      typeof count !== 'number'
    ) {
      return {
        statusCode: 400,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true,
        },
        body: JSON.stringify({ message: 'Bad input provided in product fields' }),
      };
    }

    const dbResponse = await client.query(createProductQuery, [description, title, price, count]);
    const { product_id: productId } =  dbResponse.rows[0];

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
  } finally {
    client.end();
  }
};
