import { createClient } from './db/connect';
import createProductQuery from './db/create-product.sql';

export const sendToDB = async (potentialProduct) => {
  const {
    description,
    title,
    price: priceStr,
    count: countStr,
  } = potentialProduct;

  const price = +priceStr;
  const count = +countStr;

  if (
    typeof description !== 'string' ||
    typeof title !== 'string' ||
    typeof price !== 'number' ||
    typeof count !== 'number' ||
    Number.isNaN(price) ||
    Number.isNaN(count)
  ) {
    false;
  }

  try {
    const client = await createClient();
    const dbResponse = await client.query(createProductQuery, [description, title, price, count]);
    const { product_id: productId } =  dbResponse.rows[0];
    client.end();

    console.log('Product is added to database', potentialProduct, productId);

    return productId;
  } catch (e) {
    return false;
  }
}
