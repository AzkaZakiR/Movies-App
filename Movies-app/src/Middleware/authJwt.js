import jwt, { verify } from "jsonwebtoken"
import secretKey from "./config.js";

//const secretKey = "azka-secret-key"

console.log(secretKey);

export const verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"];

    if(!token) {
        return res.status(403).send({
            message: "No token provided!!"
        })
    }

    jwt.verify(token, secretKey, (err, decoded) => {
        if(err){
            return res.status(401).send({
                message: "Unauthorized!!"
            });
        }
        req.userId = decoded.id
        next()
    })
}