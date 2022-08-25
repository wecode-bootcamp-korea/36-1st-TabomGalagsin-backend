const cartDao = require('../models/cartDao');

const createCart = async(productId, quantity, sizeId, colorId, userId) => {
    const [{checkingProductResult}] = await cartDao.checkingInputData(productId, sizeId, colorId);

    if(Number(checkingProductResult) === 0) {
        const error = new Error('KEY_VALUE_ERROR');
        error.statusCode = 400;
        throw error;
    }

    const [productInfo] = await cartDao.getProductInfo(productId, sizeId, colorId);
    
    if(Number(productInfo.stock) < 1) {
        const error = new Error('PRODUCT_STOCK_WAS_EMPTY');
        error.statusCode = 400;
        throw error;
    }
    
    const [checkingOrderId] = await cartDao.checkingOrderId(userId);
    
    if (!checkingOrderId.id) {
        await cartDao.createOrder(userId)
    }

    const [{duplicateResult}] = await cartDao.duplicateProductCheck(userId, productInfo.productOptionId);
    
    if(Number(duplicateResult) !== 0) {
        const error = new Error('PRODUCT_ALREADY_EXISTS_IN_CART');
        error.statusCode = 400;
        throw error;
    }

    return await cartDao.createOrderItem(productInfo.productOptionId, quantity, userId, productInfo.price);
}

const searchCart = async(userId) => {
    const [checkingOrderId] = await cartDao.checkingOrderId(userId);
    
    if (!checkingOrderId.id) {
        const error = new Error('CART_WAS_EMPTY');
        error.statusCode = 400;
        throw error;
    }

    return await cartDao.getOrderItem(checkingOrderId.id); 
}

const updateCart = async(userId, orderItemsId, quantity) => {
    const [{result}] = await cartDao.checkingCart(userId, orderItemsId)

    if (Number(result) === 0) {
        const error = new Error('INPUT_ERROR');
        error.statusCode = 400;
        throw error;
    }

    const [{stock}] = await cartDao.getProductStock(orderItemsId);

    if((stock - quantity) < 0) {
        const error = new Error('QUANTITY_MORE_THAN_STOCK');
        error.statusCode = 400;
        throw error;
    }

    return await cartDao.updateCart(orderItemsId, quantity);
}

const deleteCart = async(orderItemsId) => {
    return await cartDao.deleteCart(orderItemsId);
}

module.exports = {
    createCart,
    searchCart,
    updateCart,
    deleteCart
}