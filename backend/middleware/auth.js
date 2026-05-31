const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET;

const auth = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({msg: "No token provided"});
    }
    const token = authHeader.split(' ')[1];
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
module.exports = auth;
