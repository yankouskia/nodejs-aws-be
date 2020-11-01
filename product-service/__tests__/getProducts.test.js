import { getProducts } from '../getProducts';

jest.mock('../db.js', () => ({
  loadProducts: () => ([{
    id: 'product',
  }])
}))

test('should return product', async () => {
  const product = await getProducts();
  expect(product.statusCode).toEqual(200);
  expect(product.body).toMatchSnapshot();
});
