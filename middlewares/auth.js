const jwt = require('jsonwebtoken');

const validateToken = async (req, res, next) => {
	try {
		const token = await req.headers.authorization;
        const decoded = await jwt.verify(token, process.env.SECRETKEY);
        if(decoded){
            next(); 
        }
	} catch (err) {
		  res.status(401).json({ message : 'Invalid Access Token' })
	  }
};

module.exports = {
	validateToken
}
