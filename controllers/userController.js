const userService = require("../services/userService");

const signUp = async (req, res) => {
  const beforePassword = req.body.password;
  const { firstName, lastName, nickName, email, address } = req.body;
  if (
    !firstName ||
    !lastName ||
    !nickName ||
    !email ||
    !address ||
    !beforePassword
  ) {
    const err = new Error("KEY_ERROR");
    err.statusCode = 400;
    throw err;
  }
  await userService.signUp(
    firstName,
    lastName,
    nickName,
    email,
    address,
    beforePassword
  );
  res.status(201).json({ message: "userCreated" });
};

const login = async (req, res) => {
  const email = req.body.email;
  const checkPassword = req.body.password;
  if (!checkPassword) {
    const err = new Error("KEY_ERROR");
    err.statusCode = 400;
    throw err;
  }
  const token = await userService.login(email, checkPassword);
  res.status(201).json({ accessToken: token });
};

module.exports = {
  signUp,
  login,
};
