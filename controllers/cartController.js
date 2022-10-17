const cartService = require('../services/cartService');

const createCart = async (req, res) => {
  const { productId, quantity, sizeId, colorId, decoded } = req.body;
  const userId = decoded.id;

  if (!productId || !quantity || !sizeId || !colorId) {
    return res.status(400).json({ message: 'KEY_ERROR' });
  }

  await cartService.createCart(productId, quantity, sizeId, colorId, userId);
  return res.status(201).json({ message: 'CREATE_CART' });
};

const searchCart = async (req, res) => {
  const { decoded } = req.body;
  const cartInfo = await cartService.searchCart(decoded.id);
  return res.status(200).json({ cart: cartInfo });
};

const updateCart = async (req, res) => {
  const { orderItemsId } = req.params;
  const { decoded, quantity } = req.body;

  await cartService.updateCart(decoded.id, orderItemsId, quantity);
  return res.status(200).json({ message: 'CART_UPDATED' });
};

const deleteCart = async (req, res) => {
  const { orderItemsId } = req.params;
  await cartService.deleteCart(orderItemsId);
  return res.status(204).json({ message: 'DELETED_DATA' });
};

module.exports = {
  createCart,
  searchCart,
  updateCart,
  deleteCart,
};
