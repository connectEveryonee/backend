import { VerifyJwt } from "../util/Jwt.js";
import { json } from "express";

export function AuthCheck() {
  return (req, res, next) => {
    const authtoken = req.headers.authorization;
    try {
      if (!authtoken || !authtoken.startsWith("Bearer")) {
        res.status(201);
        res.send("plz login");
      }
      const token = authtoken.split(" ")[1];
      const verifyJwt = VerifyJwt(token);
      if (verifyJwt != null) {
        next();
      } else {
        res.status(401);
        res.send(error);
      }
    } catch (error) {
      res.send(error);
      res.status(401);
    }
  };
}
