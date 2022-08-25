const { database } = require('./database');
const { orderStatusEnum } = require('./enumCollection');

const checkingInputData = async (productId, sizeId, colorId) => {
    try{
        const checkingProductResult = await database.query(`
        SELECT EXISTS (
            SELECT po.id FROM products_option po
            WHERE po.product_id = ?
            AND po.size_id = ?
            AND po.color_id = ?
        ) checkingProductResult ;
        `, [productId, sizeId, colorId])
        return JSON.parse(JSON.stringify(checkingProductResult))
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
        WHERE product_id = ?
        AND size_id = ?
        AND color_id = ?;`, [productId, sizeId, colorId]);
        return JSON.parse(JSON.stringify(result));
    } catch (err) {
        const error = new Error('INVALID_DATA_INPUT');
        error.statusCode = 500;
        throw error;
    }
}

const checkingOrderId = async (userId) => {
    try {
        return await database.query(`
        SELECT id FROM orders WHERE user_id = ? AND order_status_id = ?;
        `, [userId, orderStatusEnum.cart])
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
            SELECT ${userId}, ${orderStatusEnum.cart} FROM orders
            WHERE NOT EXISTS (SELECT id FROM orders
                WHERE user_id = ${userId} AND order_status_id = ${orderStatusEnum.cart});
                `);
    } catch (err) {
        const error = new Error('INVALID_DATA_INPUT');
        error.statusCode = 500;
        throw error;
    }
}

const duplicateProductCheck = async (userId, productOptionId) => {
    try {
        const duplicateResult = await database.query(`
                SELECT EXISTS (
                    SELECT id 
                    FROM order_items 
                    WHERE order_id = 
                    (SELECT id FROM orders 
                        WHERE user_id = ? 
                        AND order_status_id = ?)
                    AND products_option_id = ?) as duplicateResult;`, [userId, orderStatusEnum.cart, productOptionId]);
        return JSON.parse(JSON.stringify(duplicateResult));
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
            (SELECT id FROM orders
                WHERE user_id = ${userId}
                AND order_status_id = ${orderStatusEnum.cart}),
            ${orderStatusEnum.cart},
            ${quantity},
            ${price})`)
        return
    } catch (err) {
        const error = new Error('INVALID_DATA_INPUT');
        error.statusCode = 500;
        throw error;
    }
}

const getOrderItem = async (orderId) => {
    try {
        const products = await database.query(`
        SELECT
            oi.id orderItemsId,
	        p.id productId,
            p.name productName, 
	        c.color_name color,
	        s.size size,
            po.stock stock,
	        pi.image_url thumbnailUrl,
	        oi.quantity quantity,
	        oi.total_price price
        FROM order_items oi 
        INNER JOIN products_option po 
        ON oi.products_option_id = po.id
        INNER JOIN color c
        ON po.color_id = c.id
        INNER JOIN size s
        ON po.size_id = s.id
        INNER JOIN products p
        ON p.id = po.product_id
        INNER JOIN product_image pi
        ON pi.product_id = p.id AND pi.color_id = c.id
        where order_id = ? AND order_status_id = ?
        ORDER by orderItemsId, productId, c.id;
        `, [orderId, orderStatusEnum.cart]);
        return JSON.parse(JSON.stringify(products));
    } catch (err) {
        const error = new Error('INVALID_DATA_INPUT');
        error.statusCode = 500;
        throw error;
    }
}

const checkingCart = async (userId, orderItemsId) => {
    try {
        return await database.query(`
        SELECT EXISTS (
            SELECT o.user_id FROM orders o
            INNER JOIN order_items oi
            ON o.id = oi.order_id
            WHERE o.user_id = ? AND oi.id = ?
        ) result ;`, [userId, orderItemsId])
    } catch (err) {
        const error = new Error('INVALID_DATA_INPUT');
        error.statusCode = 500;
        throw error;
    }
}

const getProductStock = async (orderItemsId) => {
    try {
        return await database.query(`
        SELECT
            p.stock stock
        FROM products_option p
        INNER JOIN order_items o
        ON p.id = o.products_option_id
        WHERE o.id = ?;`, [orderItemsId])
    } catch (err) {
        const error = new Error('INVALID_DATA_INPUT');
        error.statusCode = 500;
        throw error;
    }
}

const updateCart = async (orderItemsId, quantity) => {
    try {
        return await database.query(`
        UPDATE order_items SET
            quantity = ?
        WHERE id = ?;
        `, [quantity, orderItemsId])
    } catch (err) {
        const error = new Error('INVALID_DATA_INPUT');
        error.statusCode = 500;
        throw error;
    }
}

const deleteCart = async (orderItemsId) => {
    try {
        return await database.query(`
        DELETE FROM order_items WHERE id = ?;
        `, [orderItemsId])
    } catch (err) {
        const error = new Error('INVALID_DATA_INPUT');
        error.statusCode = 500;
        throw error;
    }
}

module.exports = {
    checkingInputData,
    createOrder,
    createOrderItem,
    getProductInfo,
    checkingOrderId,
    getOrderItem,
    updateCart,
    deleteCart,
    checkingCart,
    getProductStock,
    duplicateProductCheck
}