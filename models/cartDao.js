const { database } = require('./database');

const inputDataCheck = async (productId, sizeId, colorId) => {
    try{
        const result =await database.query(`
        SELECT EXISTS (
            SELECT po.id FROM products_option po
            WHERE po.product_id = ${productId}
            AND po.size_id = ${sizeId}
            AND po.color_id = ${colorId}
        ) result ;
        `)
        return JSON.parse(JSON.stringify(result))
    } catch (err) {
        const error = new Error('INVALID_DATA_INPUT');
        error.statusCode = 500;
        throw error;
    }
}

const getProductInfo = async (productId, sizeId, colorId) => {
    try {
        const result = await database.query(`
        SELECT
            products_option.id productOptionId,
            products_option.stock,
            products.price
        FROM products_option
        INNER JOIN products
        ON products_option.product_id = products.id
        WHERE product_id = ${productId}
        AND size_id = ${sizeId}
        AND color_id = ${colorId};
    `);
        return JSON.parse(JSON.stringify(result));
    } catch (err) {
        const error = new Error('INVALID_DATA_INPUT');
        error.statusCode = 500;
        throw error;
    }
}

const createOrder = async (userId) => {
    try {
        return await database.query(`
        INSERT INTO orders (
            user_id, 
            order_status_id)
            SELECT ${userId}, 1 FROM orders
            WHERE NOT EXISTS (SELECT id FROM orders
                WHERE user_id = ${userId} AND order_status_id = 1);
                `);
    } catch (err) {
        const error = new Error('INVALID_DATA_INPUT');
        error.statusCode = 500;
        throw error;
    }
}

const checkingProduct = async (userId, productOptionId) => {
    try {
        return await database.query(`
                SELECT EXISTS (
                    SELECT id 
                    FROM order_items 
                    WHERE order_id = 
                    (SELECT id FROM orders 
                        WHERE user_id = ${userId} 
                        AND order_status_id = 1)
                    AND products_option_id = ${productOptionId}) as result;`);
    } catch (err) {
        const error = new Error('INVALID_DATA_INPUT');
        error.statusCode = 500;
        throw error;
    }
}

const createOrderItem = async (productOptionId, quantity, userId, price) => {
    try {
        await database.query(`
        INSERT INTO order_items (
            products_option_id,
            order_id,
            order_status_id,
            quantity,
            total_price
        ) VALUES (
            ${productOptionId},
            (SELECT id FROM orders WHERE user_id = ${userId} AND order_status_id = 1),
            1,
            ${quantity},
            ${price})`)
        return
    } catch (err) {
        const error = new Error('INVALID_DATA_INPUT');
        error.statusCode = 500;
        throw error;
    }
}

module.exports = {
    inputDataCheck,
    createOrder,
    createOrderItem,
    getProductInfo,
    checkingProduct
}