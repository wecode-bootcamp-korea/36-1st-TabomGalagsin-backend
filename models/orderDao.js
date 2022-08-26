const { database } = require('./database');
const { orderStatusEnum } = require('./enumCollection');

const updateOrderStatus = (userId) => {
    try {
        return database.query(`
            UPDATE orders AS A INNER JOIN order_items AS B ON A.id = B.order_id  
            SET A.order_status_id = ?, B.order_status_id = ?
            WHERE A.user_id = ? AND A.order_status_id = ?`, 
            [orderStatusEnum.order, orderStatusEnum.order, userId, orderStatusEnum.cart]
        ) 
    }
    catch (err) {    
        throw new Error('INVALID_DATA_INPUT')
    }
};

const getProductDetail = async (userId) => {
    return database.query(`
        SELECT 
            order_items.products_option_id,
            order_items.quantity
        from orders
        INNER JOIN order_items ON order_items.order_id = orders.id
        WHERE orders.user_id = ? AND orders.order_status_id = ?`, [userId, orderStatusEnum.cart]
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
            WHERE id = ?`, [quantityid[0], quantityid[1]]
        ) 
    }
    catch (err) {    
        throw new Error('INVALID_DATA_INPUT')
    }
};

const getUserPoint = async (userId) => {
    return database.query(`
        SELECT 
            point
        from users
        WHERE users.id = ?`, [userId]
    )
}

module.exports = {
    updateOrderStatus, getProductDetail, getPoint, updateOrderPoint, updateOrderRecommend, updateOrderQuantity, getUserPoint
}