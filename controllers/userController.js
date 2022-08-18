const userService = require('../services/userService');

const signup = async (req, res) => {
    try {
        const beforepassword = req.body.password
        const {first_name, last_name, nick_name, email, address} = req.body
        if(!first_name || !last_name || !nick_name || !email|| !address|| !beforepassword){
            const err = new Error('KEY_ERROR')
            err.statusCode = 400
            throw err
        }
        await userService.signup(first_name, last_name, nick_name, email, address, beforepassword);
        res.status(201).json({message: "userCreated"})
    }
    catch (err) {
        console.log(err)
        res.status(err.statusCode || 500).json({message : err.message})
    }
};

const login = async (req, res) => {
    try {
        const email = req.body.email
        const checkpassword = req.body.password
        if(!checkpassword){
            const err = new Error('KEY_ERROR')
            err.statusCode = 400
            throw err
        }
        const token = await userService.login(email, checkpassword);
        res.status(201).json({"accessToken" : token})
    }
    catch (err) {
        console.log(err)
        res.status(err.statusCode || 500).json({message : err.message})
    }
};

module.exports = {
	signup, login
}