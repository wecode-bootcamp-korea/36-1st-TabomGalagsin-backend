const { database } = require('./database');
const { orderStatus } = require('./orderStatusEnum');

const orderStatusAdd = (userId) => {
    try {
        return database.query(`
            UPDATE orders AS A INNER JOIN order_items AS B ON A.id = B.order_id  
            SET A.order_status_id = ?, B.order_status_id = ?
            WHERE A.user_id = ? AND A.order_status_id = ?`, 
            [orderStatus.done, orderStatus.done, userId, orderStatus.order]
        ) 
    }
    catch (err) {    
        throw new Error('INVALID_DATA_INPUT')
    }
};

const productDetailCheck = async (userId) => {
    return database.query(`
        SELECT 
            product_option_id,
            quantity 
        from orders
        INNER JOIN order_items ON order_items.order_id = order_id
        WHERE orders.user_id = ?`, [userId]
    )
}

const pointCheck = async (userId) => {
    return database.query(`
        SELECT 
            point 
        from users 
        WHERE users.id = ?`, [userId]
    )
}

const orderPointCalculate = (userId, totalPrice) => {
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

const orderRecommendAdd = (userOptionId) => {
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

const orderQuantityCalculate = (quantityid) => {
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
    orderStatusAdd, productDetailCheck, pointCheck, orderPointCalculate, orderRecommendAdd, orderQuantityCalculate
}