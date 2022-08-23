const productDao = require('../models/productDao')

const LookUpNew = async () => {
    const lookUpMain = await productDao.lookUpNew()
    for(let type of lookUpMain){
        type.color = JSON.parse(type.color)
        type.size = JSON.parse(type.size)
    }
    return lookUpMain;
};

const lookUpRecommend = async (decoded) => {
    const userId = await Object.values(decoded)[0]
    const sql = await productDao.checkColorId(userId)
    const colorId = Object.values(sql[sql.length-1])[0] 
    const lookUpMain = await productDao.lookUpRecommend(colorId)
    for(let type of lookUpMain){
        type.color = JSON.parse(type.color)
        type.size = JSON.parse(type.size)
    }
    return lookUpMain;
};

const randomLookUp = async () => {
    const lookUpMain = await productDao.randomLookUp()
    for(let type of lookUpMain){
        type.color = JSON.parse(type.color)
        type.size = JSON.parse(type.size)
    }
    return lookUpMain;
};

const productColorLookUp = async (productId, colorId) => {
    const productColorUrl = await productDao.productColorUrl(productId, colorId)
    return productColorUrl;
};

const getProductDetailByproductId = async (productId) => {
    const productInfos = await productDao.getProductInfoByproductId(productId)
    for (const productInfo of productInfos) {
        productInfo.color = JSON.parse(productInfo.color);
        productInfo.size = JSON.parse(productInfo.size);
        productInfo.stock = JSON.parse(productInfo.stock);
    }
    return await JSON.parse(JSON.stringify(productInfos));
}

module.exports = {
    productColorLookUp, LookUpNew, lookUpRecommend, randomLookUp, getProductDetailByproductId
}