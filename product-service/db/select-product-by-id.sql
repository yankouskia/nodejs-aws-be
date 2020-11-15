SELECT product.id, product.description, product.title, product.price, stock.count
FROM product, stock
WHERE product.id = stock.product_id AND product.id = $1
