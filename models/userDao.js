const { database } = require("./database");

const emailCheck = async (email) => {
  return database.query(`
        SELECT EXISTS(
            SELECT 
                email 
            from users 
            WHERE email = '${email}'
        ) AS RESULT`);
};

const createUser = async (
  firstName,
  lastName,
  nickName,
  email,
  address,
  password
) => {
  return database.query(
    `
            INSERT INTO users(
                first_name, 
                last_name, 
                nick_name, 
                email,
                address,
                password
            ) VALUES (?, ?, ?, ?, ?, ?)`,
    [firstName, lastName, nickName, email, address, password]
  );
};

const idUser = async (email) => {
  return database.query(`
        SELECT 
            id
        FROM users
        WHERE email = '${email}'`);
};

const loginUser = async (email) => {
  return database.query(`
        SELECT 
            password
        FROM users
        WHERE email = '${email}'`);
};

module.exports = {
  createUser,
  loginUser,
  emailCheck,
  idUser,
};
