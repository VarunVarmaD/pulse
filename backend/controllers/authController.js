const pool = require('../db/pool.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const register = async(req, res) => {
    try {
        const { email, password } = req.body;
        const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
        if (result.rows.length > 0) {
            res.status(400).json({msg: "You are already registered with this email. Please try to log in"});
            return;
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await pool.query("INSERT INTO users (email, password_hash) VALUES($1, $2) RETURNING user_id", [email, hashedPassword]);
        const token = jwt.sign({user_id: newUser.rows[0].user_id}, process.env.JWT_SECRET, {expiresIn: '7d'});
        res.status(200).json({token: token, msg: "Welocme to Pulse"});
    } catch(err) {
        res.status(500).json({msg: "Something went wrong"});
    }

}

const login = async(req, res) => {
    try {
        const { email, password } = req.body;
        const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
        if (result.rows.length === 0) {
            res.status(400).json({msg: "Wrong email or you haven't registered"});
            return;
        }
        const isMatch = await bcrypt.compare(password, result.rows[0].password_hash);
        if(isMatch) {
            const token = jwt.sign({user_id: result.rows[0].user_id}, process.env.JWT_SECRET, {expiresIn: '7d'});
            res.status(200).json({token: token, msg: `Welcome back ${result.rows[0].user_id}`});
        } else {
            res.status(401).json({msg: "Wrong password"});
        }
    } catch(err) {
        res.status(500).json({msg: "Something went wrong"});
    }
}

module.exports = {register, login}