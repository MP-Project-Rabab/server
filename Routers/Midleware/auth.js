const dotenv = require("dotenv"); 
dotenv.config();

const jwt = require("jsonwebtoken");
const secretKey = process.env.SECRET_KEY;

const authentication = (req, res, next) => {
    try {
        if(!req.headers.authorization) {
            return res.status(403).json({ message: "forbidden" });
        }
        const token = req.headers.authorization.split(" ")[1]
        const parseToken = jwt.verify(token, secretKey);
        req.saveToken = parseToken;
        next();
    } catch (error) {
        res.status(403).json
    }
};

module.exports = authentication;
