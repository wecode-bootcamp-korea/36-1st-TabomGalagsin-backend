const productsDao = require('../models/productsDao');

const getProductDetailByproductId = async (productId) => {
    const productInfos = await productsDao.getProductInfoByproductId(productId)
    for (const productInfo of productInfos) {
        productInfo.color = JSON.parse(productInfo.color);
        productInfo.size = JSON.parse(productInfo.size);
        productInfo.stock = JSON.parse(productInfo.stock);
    }
    return await JSON.parse(JSON.stringify(productInfos));
}

module.exports = {
    getProductDetailByproductId
}