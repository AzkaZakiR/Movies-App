import jwt, { verify } from "jsonwebtoken";
import secretKey from "./config.js";

//const secretKey = "azka-secret-key"

export const verifyToken = (req, res, next) => {
  let token = req.body.token || req.query.token || req.headers["x-access-token"] || req.headers["authorization"];

  if (!token) {
    return res.status(403).send({
      message: "No token provided!!",
    });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!!",
      });
    }
    req.userId = decoded.id;
    console.log(req.userId);
    next();
  });
};
