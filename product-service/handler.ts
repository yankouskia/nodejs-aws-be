import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';

export const hello: APIGatewayProxyHandler = async (event, _context) => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Go Serverless Webpack (Typescript) v1.0! Your function executed successfully!',
      input: event,
    }, null, 2),
  };
}

export const products: APIGatewayProxyHandler = async () => {
  try {
    return {
      statusCode: 200,
      body: JSON.stringify([
        {
          id: '1',
          name: 'Name1'
        },
        {
          id: '2',
          name: 'Name2'
        }
      ])
    }
  } catch (error) {
    return {
      statusCode: 404,
      body: 'Error Not Found'
    }
  }
};

export const product: APIGatewayProxyHandler = async (event) => {
  const { id } = event.pathParameters
  return {
    statusCode: 200,
    body: id
  }
};