const categoriesDao = require('../models/categoriesDao');

const convertJson = (datas) => {
    for(const data of datas) {
        data.color = JSON.parse(data.color);
        data.size = JSON.parse(data.size);
        data.stock = JSON.parse(data.stock);
    }
    return datas
}

const searchByType = async (categoryName) => {
    const productInfos = await categoriesDao.getProductByType(categoryName);
    return await convertJson(productInfos);
}

const searchByColor = async (colorId) => {
    const productInfos = await categoriesDao.getProductByColor(colorId)
    return await convertJson(productInfos);
}

module.exports = {
    searchByColor,
    searchByType
}