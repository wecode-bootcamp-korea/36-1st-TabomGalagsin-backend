const categoriesDao = require('../models/categoriesDao');

const convertJson = (datas) => {
    for(const data of datas) {
        data.color = JSON.parse(data.color);
        data.size = JSON.parse(data.size);
        data.stock = JSON.parse(data.stock);
    }
    return datas
}

const convertSortValue = (query) => {
    const keys = Object.keys(query)
    let [values] = Object.values(query)
    if(keys.includes('ordering')){
        if(values.charAt(0) === '-'){
            values = `p.${values.substr(1)} DESC`
        }
        else {
            values = `p.${values}`
        }
    } else {
        values = `p.created_at`
    }
    return values
}

const convertPriceValue = (query) => {
    const keys = Object.keys(query)
    const values = Object.values(query)
    if(keys.includes('pricemax')){
        return values
    } else {
        return [0, 999999]
    }
}

const convertThemeValue = (query) => {
    const keys = Object.keys(query)
    const values = Object.values(query)
    if(keys.includes('theme')){
        return values
    } else {
        return '%'
    }
}

const searchByType = async (typeId, query) => {
    const sort = convertSortValue(query)
    const priceLimitRange = convertPriceValue(query)
    const theme = convertThemeValue(query)
    const productInfos = await categoriesDao.getProductByType(typeId, sort, priceLimitRange, theme)
    return await convertJson(productInfos);
}

const searchByColor = async (colorId, query) => {
    const sort = convertSortValue(query)
    const priceLimitRange = convertPriceValue(query)
    const theme = convertThemeValue(query)
    const productInfos = await categoriesDao.getProductByColor(colorId, sort, priceLimitRange, theme)
    return await convertJson(productInfos);
}

module.exports = {
    searchByColor,
    searchByType
}