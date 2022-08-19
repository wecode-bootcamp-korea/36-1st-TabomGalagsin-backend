const { database } = require('./database');

const searchProductsType = async (typeId) => {
    try {
        const result = await database.query(`
        SELECT
            products.id AS productid,
            products.name,
            products.price,
            products.description,
            products.type_id,
            products.thumbnail_url,
            JSON_OBJECTAGG(color.id, color_name) AS color,
            JSON_OBJECTAGG(size.id, size.size) AS size
        FROM products
        LEFT JOIN sizes_products ON products.id = sizes_products.product_id
        INNER JOIN size ON sizes_products.size_id = size.id
        INNER JOIN colors_products ON products.id = colors_products.product_id
        INNER JOIN color ON colors_products.color_id = color.id
        WHERE products.type_id = ?
        GROUP BY products.id`
        , [typeId]);
        return JSON.parse(JSON.stringify(result));
    } catch (err) {
        const error = new Error('INVALID_DATA_INPUT');
        error.statusCode = 500;
        throw error;
    }
}

const searchProductsColor = async (colorId) => {
    try {
        const result = await database.query(`
        SELECT
            products.id AS productid,
            products.name,
            products.price,
            products.description,
            products.type_id,
                (SELECT 
                    pi.image_url 
                FROM product_image pi 
                INNER join products p
                ON pi.product_id = p.id
                INNER JOIN color c 
                ON pi.color_id = c.id
                WHERE pi.product_id = products.id
                AND pi.color_id = color.id) AS image_ulr,
            JSON_OBJECTAGG(color.id, color_name) AS color,
            JSON_OBJECTAGG(size.id, size.size) AS size
        FROM products
        LEFT JOIN sizes_products ON products.id = sizes_products.product_id
        INNER JOIN size ON sizes_products.size_id = size.id
        INNER JOIN colors_products ON products.id = colors_products.product_id
        INNER JOIN color ON colors_products.color_id = color.id
        WHERE color.id = ?
        GROUP BY products.id`
        , [colorId]);
        return JSON.parse(JSON.stringify(result));
    } catch (err) {
        const error = new Error('INVALID_DATA_INPUT');
        error.statusCode = 500;
        throw error;
    }
}

module.exports = {
    searchProductsType,
    searchProductsColor
}