const { database } = require('../models/database');

const getProductInfoByproductId = async (productId) => {
    try {
        return await database.query(`
        SELECT 
        p.id productId,
        p.name,
        p.price,
        p.description,
        p.is_new,
        p.thumbnail_url imageUrl,
		(SELECT
            JSON_ARRAYAGG(JSON_OBJECT(
                'colorId', c.id,
                'color', c.color_name)) JSONcolor
            FROM (SELECT DISTINCT 
                    color.id,
                    color.color_name
                FROM products
                INNER JOIN products_option
                ON products.id = products_option.product_id
                INNER JOIN color ON products_option.color_id = color.id
                WHERE products.id = p.id) c
        ) color,
        (SELECT
            JSON_ARRAYAGG(JSON_OBJECT(
                'sizeId', s.id,
                'size', s.size)) JSONsize
                FROM (SELECT DISTINCT 
                    size.id,
                    size.size 
                FROM products
                INNER JOIN products_option
                ON products.id = products_option.product_id
                INNER JOIN size ON products_option.size_id = size.id
                WHERE products.id = p.id) s
        ) AS size,
        (SELECT
            JSON_ARRAYAGG(JSON_OBJECT(
                'colorId', stock.colorId,
                'colorName', stock.colorName,
                'size', stock.size,
                'stock', stock.stock)) JSONstock
                FROM (SELECT DISTINCT 
                        color.id colorId,
                        color.color_name colorName,
                        size.id sizeId,
                        size.size,
                        products_option.stock 
                    FROM products
                    INNER JOIN products_option
                    ON products.id = products_option.product_id
                    INNER JOIN size ON products_option.size_id = size.id
                    INNER JOIN color ON products_option.color_id = color.id
                    WHERE products.id = p.id) stock
        ) AS stock
        FROM products p
        WHERE p.id = ?
        GROUP by p.id
        ORDER BY p.id;`
        , [productId]);
    } catch (err) {
        const error = new Error('INVALID_DATA_INPUT');
        error.statusCode = 500;
        throw error;
    }
}

module.exports = {
    getProductInfoByproductId
}