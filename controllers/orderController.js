const orderService = require('../services/orderService');

const payment = async (req, res) => {
    try {
        const {totalPrice, decoded} = req.body
        if(!totalPrice){
            const err = new Error('KEY_ERROR')
            err.statusCode = 400
            throw err
        }
        const remainPoint = await orderService.orderPayment(totalPrice, decoded);
        res.status(200).json({remainUserPoint : remainPoint}) 
    }
    catch (err) {
        res.status(err.statusCode || 500).json({message : err.message})
    }
};

module.exports = {
    payment
}