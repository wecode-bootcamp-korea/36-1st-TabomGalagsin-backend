const orderDao = require('../models/orderDao')

const orderPayment = async (totalPrice, decoded) => {
    const userId = await decoded.id
    const productDetail = await orderDao.productDetail(userId)
    const userOptionId = [];
    const quantityOptionId = [];
    for(let pDetail of productDetail){
        userOptionId.push([userId, pDetail.product_option_id])
        quantityOptionId.push([pDetail.quantity, pDetail.product_option_id])
    }
    await orderDao.paymentStatus(userId)
    const pointCheck = await orderDao.pointCheck(userId)
    if(Number(pointCheck[0].point) <= totalPrice){
        const err = new Error('not enough points')
        err.statusCode = 400
        throw err;
    }   
    await orderDao.paymentPoint(userId, totalPrice)
    await orderDao.paymentRecommend(userOptionId)
    for(let quantityOid of quantityOptionId){
        await orderDao.paymentQuantity(quantityOid)
    }
};

module.exports = {
    orderPayment
}