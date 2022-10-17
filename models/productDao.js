const { database } = require("./database");

const lookUpNew = () => {
  return database.query(`
    SELECT  
        p.id AS productId,
        p.name,
        p.price,
        p.is_new,
        p.thumbnail_url AS thumbnailUrl,
        p.type_id,
        (SELECT
            JSON_ARRAYAGG(JSON_OBJECT(
                'colorId', c.id,
                'color', c.color_name,
                'thumbnailUrl', c.image_url)) JSONcolor
            FROM (SELECT DISTINCT 
                    color.id,
                    color.color_name,
                    product_image.image_url
                FROM products
                INNER JOIN products_option
                ON products.id = products_option.product_id
                INNER JOIN color ON products_option.color_id = color.id
                INNER JOIN product_image ON product_image.product_id = products.id
                AND product_image.color_id = color.id
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
    INNER JOIN products_option ON p.id = products_option.product_id
    WHERE p.is_new = true AND products_option.stock > 0
    GROUP BY p.id
    ORDER BY RAND() LIMIT 4`);
};

const productColorUrl = (productId, colorId) => {
  return database.query(`
    SELECT
	    pi.image_url thumbnailUrl,
	    JSON_ARRAYAGG(JSON_OBJECT(
            'sizeId', s.id,
            'size', s.size,
            'stock', po.stock)) size
    FROM products p
    INNER JOIN products_option po
    ON p.id = po.product_id
    INNER JOIN color c
    ON po.color_id = c.id
    INNER JOIN size s
    ON po.size_id = s.id
    INNER JOIN product_image pi
    ON pi.product_id = p.id AND pi.color_id = c.id
    WHERE p.id = ${productId} AND c.id = ${colorId} 
    GROUP BY p.id, pi.image_url;`);
};

const lookUpRecommend = async (colorId) => {
  return database.query(
    `
    SELECT  
        p.id AS productId,
        p.name,
        p.price,
        product_image.image_url AS thumbnailUrl,
        p.type_id,
        (SELECT
            JSON_ARRAYAGG(JSON_OBJECT(
                'colorId', c.id,
                'color', c.color_name,
                'thumbnailUrl', c.image_url)) JSONcolor
            FROM (SELECT DISTINCT 
                    color.id,
                    color.color_name,
                    product_image.image_url
                FROM products
                INNER JOIN products_option
                ON products.id = products_option.product_id
                INNER JOIN color ON products_option.color_id = color.id
                INNER JOIN product_image ON product_image.product_id = products.id
                AND product_image.color_id = color.id
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
    INNER JOIN products_option ON p.id = products_option.product_id
    WHERE product_image.color_id = ? AND products_option.stock > 0
    GROUP BY p.id, product_image.image_url
    ORDER BY RAND() LIMIT 4`,
    [colorId]
  );
};

const randomLookUp = () => {
  return database.query(`
    SELECT  
        p.id AS productId,
        p.name,
        p.price,
        p.is_new,
        p.thumbnail_url AS thumbnailUrl,
        products_option.stock,
        p.type_id,
        (SELECT
            JSON_ARRAYAGG(JSON_OBJECT(
                'colorId', c.id,
                'color', c.color_name,
                'thumbnailUrl', c.image_url)) JSONcolor
            FROM (SELECT DISTINCT 
                    color.id,
                    color.color_name,
                    product_image.image_url
                FROM products
                INNER JOIN products_option
                ON products.id = products_option.product_id
                INNER JOIN color ON products_option.color_id = color.id
                INNER JOIN product_image ON product_image.product_id = products.id
                AND product_image.color_id = color.id
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
    INNER JOIN products_option ON p.id = products_option.product_id
    WHERE products_option.stock > 0
    GROUP BY p.id, products_option.stock
    ORDER BY RAND() LIMIT 4;`);
};

const checkColorId = (userId) => {
  return database.query(
    `
        SELECT products_option.color_id
        FROM users
        INNER JOIN recommend ON recommend.user_id = users.id
        INNER JOIN products_option ON products_option.id = recommend.products_option_id
        WHERE users.id = ?
        GROUP BY products_option.color_id
        HAVING count(products_option.id) =
        (SELECT max(mycount) 
        FROM (SELECT
            products_option.color_id,
            count(products_option.id) AS mycount
        FROM users
        INNER JOIN recommend ON recommend.user_id = users.id
        INNER JOIN products_option ON products_option.id = recommend.products_option_id
        WHERE users.id = ?
        GROUP BY products_option.color_id) AS result)`,
    [userId, userId]
  );
};

const getProductInfoByproductId = async (productId) => {
  return await database.query(
    `
        SELECT 
            p.id productId,
            p.name,
            p.price,
            p.description,
            p.is_new,
            t.type category,
            p.thumbnail_url thumbnailUrl,
            (SELECT
                JSON_ARRAYAGG(JSON_OBJECT(
                    'colorId', c.id,
                    'color', c.color_name,
                    'thumbnailUrl', c.image_url)) JSONcolor
                FROM (SELECT DISTINCT 
                        color.id,
                        color.color_name,
                        product_image.image_url
                    FROM products
                    INNER JOIN products_option
                    ON products.id = products_option.product_id
                    INNER JOIN color ON products_option.color_id = color.id
                    INNER JOIN product_image ON product_image.product_id = products.id
                    AND product_image.color_id = color.id
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
                    'sizeId', stock.sizeId,
                    'size', stock.size,
                    'stock', stock.stock))JSONsize
                FROM (SELECT DISTINCT 
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
        INNER JOIN products_type t
        ON p.type_id = t.id
        WHERE p.id = ?
        GROUP by p.id
        ORDER BY p.id;`,
    [productId]
  );
};

module.exports = {
  productColorUrl,
  lookUpNew,
  lookUpRecommend,
  randomLookUp,
  checkColorId,
  getProductInfoByproductId,
};
