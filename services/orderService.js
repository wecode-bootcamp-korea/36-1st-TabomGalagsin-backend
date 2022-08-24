const orderDao = require('../models/orderDao')

const lookUpPoint = async (decoded) => {
    const userId = decoded.id
    const lookUpPoint = await orderDao.getPoint(userId)
    return Number(lookUpPoint[0].point);
};

const orderPayment = async (totalPrice, decoded) => {
    const userId = await decoded.id
    const productDetail = await orderDao.getProductDetail(userId)
    const userOptionId = [];
    const quantityOptionId = [];
    for(let pDetail of productDetail){
        userOptionId.push([userId, pDetail.products_option_id])
        quantityOptionId.push([pDetail.quantity, pDetail.products_option_id])
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
    const remainPoint = await orderDao.getUserPoint(userId)
    return Number(remainPoint[0].point)
};

module.exports = {
    lookUpPoint, orderPayment
}