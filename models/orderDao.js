const { database } = require('./database');
const { orderStatusEnum } = require('./enumCollection');

const updateOrderStatus = (userId) => {
    try {
        return database.query(`
            UPDATE orders AS A INNER JOIN order_items AS B ON A.id = B.order_id  
            SET A.order_status_id = ?, B.order_status_id = ?
            WHERE A.user_id = ? AND A.order_status_id = ?`, 
            [orderStatusEnum.done, orderStatusEnum.done, userId, orderStatusEnum.order]
        ) 
    }
    catch (err) {    
        throw new Error('INVALID_DATA_INPUT')
    }
};

const getProductDetail = async (userId) => {
    return database.query(`
        SELECT 
            product_option_id,
            quantity 
        from orders
        INNER JOIN order_items ON order_items.order_id = order_id
        WHERE orders.user_id = ?`, [userId]
    )
}

const getPoint = async (userId) => {
    return database.query(`
        SELECT 
            point 
        from users 
        WHERE users.id = ?`, [userId]
    )
}

const updateOrderPoint = (userId, totalPrice) => {
    try {
        return database.query(`
            UPDATE users 
            SET point = point - ?
            WHERE users.id = ?`, [totalPrice, userId]
        ) 
    }
    catch (err) {    
        throw new Error('INVALID_DATA_INPUT')
    }
};

const updateOrderRecommend = (userOptionId) => {
    try {
        return database.query(`
            INSERT INTO recommend(
                user_id, 
                products_option_id 
            ) VALUES ?`, [userOptionId]
        ) 
    }
    catch (err) {    
        throw new Error('INVALID_DATA_INPUT')
    }
};

const updateOrderQuantity = (quantityid) => {
    try {
        return database.query(`
            UPDATE products_option 
            SET stock = stock - ?
            WHERE id = ?`, quantityid
        ) 
    }
    catch (err) {    
        throw new Error('INVALID_DATA_INPUT')
    }
};

module.exports = {
    updateOrderStatus, getProductDetail, getPoint, updateOrderPoint, updateOrderRecommend, updateOrderQuantity
}