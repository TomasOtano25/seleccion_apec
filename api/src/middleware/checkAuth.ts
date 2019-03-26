import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface MyRequest extends Request {
  userData: any;
}

const checkAuth = (req: MyRequest, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, "secret");
    req.userData = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      message: "'Auth failed"
    });
  }
};

export default checkAuth;
