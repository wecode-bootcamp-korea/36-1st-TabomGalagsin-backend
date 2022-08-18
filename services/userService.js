const userDao = require('../models/userDao')

const bcrypt = require('bcrypt');
const saltRounds = 8;

const payLoad = { foo: 'bar' };
const jwt = require('jsonwebtoken');

const secretKey = process.env.SECRETKEY; 

const signup = async (first_name, last_name, nick_name, email, address, beforepassword) => {
    if(!email.includes('@')) {
        const err = new Error('EMAIL_INVALID')
        err.statusCode = 400
        throw err
    }
    if(beforepassword.length < 4) {
        const err = new Error('PASSWORD_INVALID')
        err.statusCode = 400
        throw err
    }
    const password = await bcrypt.hash(beforepassword, saltRounds)
    const createUser = await userDao.createUser(first_name, last_name, nick_name, email, address, password)
    return createUser;
};


const login = async (email, checkpassword) => {
    const loginUser = await userDao.loginUser(email)
    const result = await bcrypt.compare(checkpassword, loginUser[0].password)
    if(result) {
        const token = jwt.sign(payLoad, secretKey)
        return token;
    }
    else {
        const err = new Error('Password incorrect')
        err.statusCode = 400
        throw err
    }
};
  
module.exports = {
    signup, login
}