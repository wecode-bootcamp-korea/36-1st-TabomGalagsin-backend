const { database } = require("./database");
const { orderStatusEnum } = require("./enumCollection");

const checkIfProductExists = async (productId, sizeId, colorId) => {
  const checkingProductResult = await database.query(
    `
    SELECT EXISTS (
        SELECT po.id FROM products_option po
        WHERE po.product_id = ?
        AND po.size_id = ?
        AND po.color_id = ?
    ) checkingProductResult ;
    `,
    [productId, sizeId, colorId]
  );
  return JSON.parse(JSON.stringify(checkingProductResult));
};

const getProductInfo = async (productId, sizeId, colorId) => {
  const result = await database.query(
    `
    SELECT
        products_option.id productOptionId,
        products_option.stock,
        products.price
    FROM products_option
    INNER JOIN products
    ON products_option.product_id = products.id
    WHERE product_id = ?
    AND size_id = ?
    AND color_id = ?;`,
    [productId, sizeId, colorId]
  );
  return JSON.parse(JSON.stringify(result));
};

const checkOrderId = async (userId) => {
  return await database.query(
    `
    SELECT id FROM orders WHERE user_id = ? AND order_status_id = ?;
    `,
    [userId, orderStatusEnum.cart]
  );
};

const createOrder = async (userId) => {
  return await database.query(
    `
    INSERT INTO orders (
        user_id, 
        order_status_id)
    VALUES (?, ?);
    `,
    [userId, orderStatusEnum.cart]
  );
};

const checkDuplicateProduct = async (userId, productOptionId) => {
  const duplicateResult = await database.query(
    `
    SELECT EXISTS (
      SELECT id 
      FROM order_items 
      WHERE order_id = 
      (SELECT id FROM orders 
          WHERE user_id = ? 
          AND order_status_id = ?)
      AND products_option_id = ?) as duplicateResult;`,
    [userId, orderStatusEnum.cart, productOptionId]
  );
  return JSON.parse(JSON.stringify(duplicateResult));
};

const createOrderItem = async (productOptionId, quantity, userId, price) => {
  await database.query(`
    INSERT INTO order_items (
      products_option_id,
      order_id,
      order_status_id,
      quantity,
      total_price
    ) VALUES (
      ${productOptionId},
      (SELECT id FROM orders
        WHERE user_id = ${userId}
        AND order_status_id = ${orderStatusEnum.cart}),
      ${orderStatusEnum.cart},
      ${quantity},
      ${price})`);
  return;
};

const getOrderItem = async (orderId) => {
  const products = await database.query(
    `
    SELECT
      oi.id orderItemsId,
      p.id productId,
      p.name productName, 
      c.color_name color,
      s.size size,
      po.stock stock,
      pi.image_url thumbnailUrl,
      oi.quantity quantity,
      oi.total_price price
    FROM order_items oi 
    INNER JOIN products_option po 
    ON oi.products_option_id = po.id
    INNER JOIN color c
    ON po.color_id = c.id
    INNER JOIN size s
    ON po.size_id = s.id
    INNER JOIN products p
    ON p.id = po.product_id
    INNER JOIN product_image pi
    ON pi.product_id = p.id AND pi.color_id = c.id
    where order_id = ? AND order_status_id = ?
    ORDER by orderItemsId, productId, c.id;
    `,
    [orderId, orderStatusEnum.cart]
  );
  return JSON.parse(JSON.stringify(products));
};

const checkIfCartExists = async (userId, orderItemsId) => {
  return await database.query(
    `
    SELECT EXISTS (
      SELECT o.user_id FROM orders o
      INNER JOIN order_items oi
      ON o.id = oi.order_id
      WHERE o.user_id = ? AND oi.id = ?
    ) result ;`,
    [userId, orderItemsId]
  );
};

const getProductStock = async (orderItemsId) => {
  return await database.query(
    `
    SELECT
      p.stock stock
    FROM products_option p
    INNER JOIN order_items o
    ON p.id = o.products_option_id
    WHERE o.id = ?;`,
    [orderItemsId]
  );
};

const updateCart = async (orderItemsId, quantity) => {
  return await database.query(
    `
      UPDATE order_items SET
        quantity = ?
      WHERE id = ?;
      `,
    [quantity, orderItemsId]
  );
};

const deleteCart = async (orderItemsId) => {
  return await database.query(
    `
    DELETE FROM order_items WHERE id = ?;
    `,
    [orderItemsId]
  );
};

module.exports = {
  checkIfProductExists,
  createOrder,
  createOrderItem,
  getProductInfo,
  checkOrderId,
  getOrderItem,
  updateCart,
  deleteCart,
  checkIfCartExists,
  getProductStock,
  checkDuplicateProduct,
};
