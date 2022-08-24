const orderDao = require('../models/orderDao')

const orderPayment = async (totalPrice, decoded) => {
    const userId = await decoded.id
    const productDetail = await orderDao.productDetailCheck(userId)
    const userOptionId = [];
    const quantityOptionId = [];
    for(let pDetail of productDetail){
        userOptionId.push([userId, pDetail.product_option_id])
        quantityOptionId.push([pDetail.quantity, pDetail.product_option_id])
    }
    await orderDao.paymentStatusAdd(userId)
    const pointCheck = await orderDao.pointCheck(userId)
    if(Number(pointCheck[0].point) <= totalPrice){
        const err = new Error('not enough points')
        err.statusCode = 400
        throw err;
    }   
    await orderDao.paymentPointCalculate(userId, totalPrice)
    await orderDao.paymentRecommendAdd(userOptionId)
    for(let quantityid of quantityOptionId){
        await orderDao.paymentQuantityCalculate(quantityid)
    }
};

module.exports = {
    orderPayment
}