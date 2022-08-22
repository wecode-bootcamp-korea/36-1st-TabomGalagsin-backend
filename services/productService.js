const productDao = require('../models/productDao')
const jwt = require('jsonwebtoken');

const LookUpNew = async () => {
    const lookUppMain = await productDao.lookUpNew()
    for(let type of lookUppMain){
        type.color = JSON.parse(type.color)
        type.size = JSON.parse(type.size)
    }
    return lookUppMain;
};

const lookUpRecommend = async (token) => {
    const decoded = await jwt.verify(token, process.env.SECRETKEY);
    const userEmail = await Object.values(decoded)[0]
    const sql = await productDao.colorId(userEmail)
    const colorId = Object.values(sql[sql.length-1])[0] 
    const lookUppMain = await productDao.lookUpRecommend(colorId)
    for(let type of lookUppMain){
        type.color = JSON.parse(type.color)
        type.size = JSON.parse(type.size)
    }
    return lookUppMain;
};

const notlookUpRecommend = async () => {
    const lookUppMain = await productDao.notlookUpRecommend()
    for(let type of lookUppMain){
        type.color = JSON.parse(type.color)
        type.size = JSON.parse(type.size)
    }
    return lookUppMain;
};

const productColor = async (productId, colorId) => {
    const productColorUrl = await productDao.productColorUrl(productId, colorId)
    return productColorUrl;
};

module.exports = {
    productColor, LookUpNew, lookUpRecommend, notlookUpRecommend
}