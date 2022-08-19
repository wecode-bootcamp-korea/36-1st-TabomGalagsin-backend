const userDao = require('../models/userDao')

const bcrypt = require('bcrypt');
const saltRounds = 8;

const jwt = require('jsonwebtoken');

const secretKey = process.env.SECRETKEY; 

const signUp = async (firstName, lastName, nickName, email, address, beforePassword) => {
    if(!email.includes('@')) {
        const err = new Error('EMAIL_INVALID')
        err.statusCode = 400
        throw err
    }
    const emailCheck = await userDao.emailCheck(email)
    if(Number(Object.values(emailCheck[0])[0]) === 1){
        const err = new Error('duplicate email')
        err.statusCode = 400
        throw err;
    }   
    if(beforePassword.length < 4) {
        const err = new Error('PASSWORD_INVALID')
        err.statusCode = 400
        throw err
    }
    const password = await bcrypt.hash(beforePassword, saltRounds)
    const createUser = await userDao.createUser(firstName, lastName, nickName, email, address, password)
    return createUser;
};

const login = async (email, checkPassword) => {
    const emailCheck = await userDao.emailCheck(email)
    if(Number(Object.values(emailCheck[0])[0]) === 0){
        const err = new Error('email_invalid')
        err.statusCode = 400
        throw err;
    }   
    const loginUser = await userDao.loginUser(email)
    const idUser = await userDao.idUser(email)
    const payLoad = { id : Object.values(idUser[0])[0], email : email }
    const result = await bcrypt.compare(checkPassword, loginUser[0].password)
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
    signUp, login
}