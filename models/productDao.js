const { database } = require('./database');

const lookUpNew = () => {
    return database.query(`
        SELECT  
            p.id AS productId,
            p.name,
            p.price,
            product_image.image_url AS thumbnailUrl,
            p.type_id,
            (SELECT 
                JSON_ARRAYAGG(JSON_OBJECT(
                    'colorId', c.id, 'color', c.color_name)) JSONcolor
                FROM (SELECT DISTINCT color.id, color.color_name
            FROM products
                INNER JOIN products_option ON products.id = products_option.product_id
                INNER JOIN color ON products_option.color_id = color.id
                WHERE products.id = p.id) c) color,
            (SELECT
                JSON_ARRAYAGG(JSON_OBJECT(
                    'sizeId', s.id, 'size', s.size)) JSONsize
                FROM (SELECT DISTINCT size.id, size.size
            FROM products
                INNER JOIN products_option ON products.id = products_option.product_id
                INNER JOIN size ON products_option.size_id = size.id
                WHERE products.id = p.id) s ) AS size
        FROM products p
        INNER JOIN product_image ON p.id = product_image.product_id
        WHERE is_new = TRUE AND product_image.color_id = 1
        GROUP BY p.id, product_image.image_url
        ORDER BY RAND() LIMIT 4`   
    )
};

const productColorUrl = (productId, colorId) => {
    return database.query(`
        SELECT
            product_id AS productId, 
            image_url AS thumbnailUrl,
            color_id AS colorId,
            color_name AS colorName
        FROM product_image
        INNER JOIN color ON color_id = color.id
        WHERE product_id = ? AND color_id = ?`, [productId, colorId]
    )
};

const lookUpRecommend = async (colorId) => {
    return database.query(`
        SELECT  
            p.id AS productId,
            p.name,
            p.price,
            product_image.image_url AS thumbnailUrl,
            p.type_id,
            (SELECT 
                JSON_ARRAYAGG(JSON_OBJECT(
                    'colorId', c.id, 'color', c.color_name)) JSONcolor
                FROM (SELECT DISTINCT color.id, color.color_name
            FROM products
                INNER JOIN products_option ON products.id = products_option.product_id
                INNER JOIN color ON products_option.color_id = color.id
                WHERE products.id = p.id) c) color,
            (SELECT
                JSON_ARRAYAGG(JSON_OBJECT(
                    'sizeId', s.id, 'size', s.size)) JSONsize
                FROM (SELECT DISTINCT size.id, size.size
            FROM products
                INNER JOIN products_option ON products.id = products_option.product_id
                INNER JOIN size ON products_option.size_id = size.id
                WHERE products.id = p.id) s ) AS size
        FROM products p
        LEFT JOIN product_image ON p.id = product_image.product_id
        WHERE product_image.color_id = ?
        GROUP BY p.id, product_image.image_url
        ORDER BY RAND() LIMIT 4`, [colorId]   
    )
}

const randomLookUp = () => {
    return database.query(`
        SELECT  
            p.id AS productId,
            p.name,
            p.price,
            product_image.image_url AS thumbnailUrl,
            p.type_id,
            (SELECT 
                JSON_ARRAYAGG(JSON_OBJECT(
                    'colorId', c.id, 'color', c.color_name)) JSONcolor
                FROM (SELECT DISTINCT color.id, color.color_name
            FROM products
                INNER JOIN products_option ON products.id = products_option.product_id
                INNER JOIN color ON products_option.color_id = color.id
                WHERE products.id = p.id) c) color,
            (SELECT
                JSON_ARRAYAGG(JSON_OBJECT(
                    'sizeId', s.id, 'size', s.size)) JSONsize
                FROM (SELECT DISTINCT size.id, size.size
            FROM products
                INNER JOIN products_option ON products.id = products_option.product_id
                INNER JOIN size ON products_option.size_id = size.id
                WHERE products.id = p.id) s ) AS size
        FROM products p
        LEFT JOIN product_image ON p.id = product_image.product_id
        WHERE product_image.color_id = 1
        GROUP BY p.id, product_image.image_url
        ORDER BY RAND() LIMIT 4`   
    )
}

const colorId = (userId) => {
    return database.query(`
        SELECT 
            products_option.color_id
        from users
        INNER JOIN recommend ON recommend.user_id = users.id
        INNER JOIN products_option ON products_option.id = recommend.products_option_id
        WHERE users.id = ?`, [userId]
    )
}

module.exports = {
    productColorUrl, lookUpNew, lookUpRecommend, randomLookUp, colorId
}