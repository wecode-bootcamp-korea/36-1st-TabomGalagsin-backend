const orderDao = require('../models/orderDao')

const orderPayment = async (totalPrice, decoded) => {
    const userId = await decoded.id
    const productDetail = await orderDao.getProductDetail(userId)
    const userOptionId = [];
    const quantityOptionId = [];
    for(let pDetail of productDetail){
        userOptionId.push([userId, pDetail.product_option_id])
        quantityOptionId.push([pDetail.quantity, pDetail.product_option_id])
    }
    await orderDao.updateOrderStatus(userId)
    const pointCheck = await orderDao.getPoint(userId)
    if(Number(pointCheck[0].point) <= totalPrice){
        const err = new Error('not enough points')
        err.statusCode = 400
        throw err;
    }   
    await orderDao.updateOrderPoint(userId, totalPrice)
    await orderDao.updateOrderRecommend(userOptionId)
    for(let quantityid of quantityOptionId){
        await orderDao.updateOrderQuantity(quantityid)
    }
};

module.exports = {
    orderPayment
}