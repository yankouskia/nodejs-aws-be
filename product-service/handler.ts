import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';
import './fake-db'
import { getProduct, getProducts } from './fake-db';

export const products: APIGatewayProxyHandler = async () => {
  const products = await getProducts()
  return {
    statusCode: 200,
    body: JSON.stringify(products)
  }
};

export const product: APIGatewayProxyHandler = async (event) => {
  const { id } = event.pathParameters
  if (isNaN(Number(id)))
  {
    return {
      statusCode: 400,
      body: "Id must be a valid number"
    }
  }
  
  const product = await getProduct(Number(id))

  if (!product)
  {
    return {
      statusCode: 404,
      body: "Product not found by passed ID"
    }
  }

  return {
    statusCode: 200,
    body: JSON.stringify(product)
  }
};