const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET;

const authenticate = (req, res, next) => {
    const token =  req.headers.authorization.split(' ')[1];
    if (!token) {
        return res.status(401).json({msg: "No token provided"});
    }

    let checkToken;
    try {
        checkToken = jwt.verify(token, jwtSecret);
    } catch (err) {
        return res.status(401).json({msg: "Unauthorized"});
    }
    req.user = checkToken.user_id;
    next();
}
module.exports = authenticate;
