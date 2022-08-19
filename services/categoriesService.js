const categoriesDao = require('../models/categoriesDao');

const convertJson = (datas) => {
    for(const data of datas) {
        data.color = JSON.parse(data.color);
        data.size = JSON.parse(data.size);
    }
    return datas
}

const typeSearch = async (categoryName) => {
    const productInfos = await categoriesDao.searchProductsType(categoryName);
    return await convertJson(productInfos);
}

const colorsSearch = async (colorId) => {
    const productInfos = await categoriesDao.searchProductsColor(colorId)
    return await convertJson(productInfos);
}


module.exports = {
    typeSearch,
    colorsSearch
}