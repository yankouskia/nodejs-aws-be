import { getProduct } from '../getProduct';

jest.mock('../db.js', () => ({
  loadProduct: () => ({
    id: 'product',
  })
}))

test('should return product', async () => {
  const product = await getProduct({ pathParameters: { id: '1' }});
  expect(product.statusCode).toEqual(200);
  expect(product.body).toMatchSnapshot();
});

test('should return error if no path parameter', async () => {
  const product = await getProduct();
  expect(product.statusCode).toEqual(500);
  expect(product.body).toMatchSnapshot();
});
