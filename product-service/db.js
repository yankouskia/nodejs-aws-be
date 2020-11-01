import products from './products.json';

export const loadProducts = async () => {
  return products;
};

export const loadProduct = async id => {
  return products.find(({ id: productId }) => productId === id);
};
