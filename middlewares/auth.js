import jwt from "jsonwebtoken";
import { User } from "../model/user.js";
import { sendError } from "../utils/sendError.js";

export const authenticated = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (token) {
      const id = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(id);
      if (user) {
        req.user = user;
        next();
      } else {
        res.status(401).json({ sucess: false, message: "Login to access" });
      }
    } else {
      sendError(res, 400, "Login To Access");
    }
  } catch (error) {
    sendError(res,400,error.message);
  }
};
