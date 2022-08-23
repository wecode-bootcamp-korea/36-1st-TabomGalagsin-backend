const cartDao = require('../models/cartDao');

const createCart = async(productId, quantity, sizeId, colorId, userId) => {
    const [checkResult] = await cartDao.inputDataCheck(productId, sizeId, colorId);
    
    if(Number(checkResult.result) === 0) {
        const error = new Error('KEY_VALUE_ERROR');
        error.statusCode = 400;
        throw error;
    }

    const [productInfo] = await cartDao.getProductInfo(productId, sizeId, colorId);

    if(productInfo.stock === 0) {
        const error = new Error('PRODUCT_STOCK_WAS_EMPTY');
        error.statusCode = 400;
        throw error;
    }
    
    await cartDao.createOrder(userId)
    
    const [productCheck] = await cartDao.checkingProduct(userId, productInfo.productOptionId);
    
    if(Number(productCheck.result) === 1) {
        const error = new Error('PRODUCT_ALREADY_EXISTS_IN_CART');
        error.statusCode = 400;
        throw error;
    }

    return await cartDao.createOrderItem(Number(productInfo.productOptionId), quantity, userId, Number(productInfo.price));
}

module.exports = {
    createCart
}