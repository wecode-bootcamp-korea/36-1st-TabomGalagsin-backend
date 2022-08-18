const { database } = require('./database');

const createUser = async (first_name, last_name, nick_name, email, address, password) => {
    const sql = await database.query(`
                    SELECT EXISTS(
                        SELECT 
                            email 
                        from users 
                        WHERE email = '${email}'
                        ) AS RESULT`)
    if(Number(Object.values(sql[0])[0]) === 1){
        const err = new Error('duplicate email')
        err.statusCode = 400
        throw err;
    }   
    try {
        return database.query(`
        INSERT INTO users(
            first_name, 
            last_name, 
            nick_name, 
            email,
            address,
            password
        ) VALUES (?, ?, ?, ?, ?, ?)`, 
        [first_name, last_name, nick_name, email, address, password]
    ) 
    }
    catch (err) {    
        throw new Error('INVALID_DATA_INPUT')
    }
};

const loginUser = async (email) => {
    const sql = await database.query(`
                    SELECT EXISTS(
                        SELECT 
                            email 
                        from users 
                        WHERE users.email='${email}'
                        ) AS RESULT`)
    if(Number(Object.values(sql[0])[0]) === 0){
        const err = new Error('This email does not exist')
        err.statusCode = 400
        throw err;
    }    
    return database.query(`
        SELECT 
            password
        FROM users
        WHERE email = '${email}'`
    )
}

module.exports = {
    createUser, loginUser
}