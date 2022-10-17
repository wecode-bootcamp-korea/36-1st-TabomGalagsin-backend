const { database } = require("./database");

const getProductByType = async (typeId, sort, priceLimitRange, theme) => {
  const result = await database.query(
    `
    SELECT 
        p.id productId,
        p.name,
        p.price,
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
                WHERE products.id = p.id and color.id = 1) stock
        ) AS stock
    FROM products p
    INNER JOIN products_type t
    ON p.type_id = t.id
    WHERE p.type_id = ? AND p.price >= ? AND p.price <= ? AND theme LIKE ?
    GROUP by p.id
    ORDER BY ${sort};`,
    [typeId, Number(priceLimitRange[0]), Number(priceLimitRange[1]), theme]
  );
  return JSON.parse(JSON.stringify(result));
};

const getProductByColor = async (colorId, sort, priceLimitRange, theme) => {
  const result = await database.query(
    `
        SELECT 
            p.id productId,
            p.name,
            p.price,
            p.is_new,
            t.type category,
            pi.image_url thumbnailUrl,
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
                    'stock', stock.stock)) JSONsize
                FROM (SELECT DISTINCT 
                    size.id sizeId,
                    size.size,
                    products_option.stock 
                    FROM products
                    INNER JOIN products_option
                    ON products.id = products_option.product_id
                    INNER JOIN size ON products_option.size_id = size.id
                    INNER JOIN color ON products_option.color_id = color.id
                    WHERE products.id = p.id and color.id = ${colorId}) stock
            ) AS stock
        FROM products p
        INNER JOIN products_type t
        ON p.type_id = t.id
        INNER JOIN products_option
        ON p.id = products_option.product_id
        INNER JOIN color
        ON color.id = products_option.color_id
        INNER JOIN product_image pi
        ON pi.color_id = color.id
        AND pi.product_id = p.id
        WHERE color.id = ${colorId}
        AND p.price >= ?
        AND p.price < ?
        AND theme LIKE ?
        GROUP by p.id, pi.image_url
        ORDER BY ${sort};`,
    [Number(priceLimitRange[0]), Number(priceLimitRange[1]), theme]
  );
  return JSON.parse(JSON.stringify(result));
};

module.exports = {
  getProductByColor,
  getProductByType,
};
