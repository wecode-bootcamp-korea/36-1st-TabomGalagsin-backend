const { database } = require('./database');

const paymentStatus = (userId) => {
    try {
        return database.query(`
            UPDATE orders AS A INNER JOIN order_items AS B ON A.id = B.order_id  
            SET A.order_status_id = 3, B.order_status_id = 3
            WHERE A.user_id = ? AND A.order_status_id = ?`, [userId, 2]
        ) 
    }
    catch (err) {    
        throw new Error('INVALID_DATA_INPUT')
    }
};

const productDetail = async (userId) => {
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

const paymentPoint = (userId, totalPrice) => {
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

const paymentRecommend = (userOptionId) => {
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

const paymentQuantity = (quantityOid) => {
    try {
        return database.query(`
            UPDATE products_option 
            SET stock = stock - ?
            WHERE id = ?`, quantityOid
        ) 
    }
    catch (err) {    
        throw new Error('INVALID_DATA_INPUT')
    }
};

module.exports = {
    paymentStatus, productDetail, pointCheck, paymentPoint, paymentRecommend, paymentQuantity
}