import jwt from "jsonwebtoken";

export const setCookies = (res, id = "", time = 0, message = "") => {
  const token = jwt.sign(id, process.env.JWT_SECRET);
  res.cookie("token", token, {
    expires: new Date(Date.now() + time),
    httpOnly: true,
    sameSite: "none",
    secure: true,
  });
  res.status(200).json({ success: true, message: message });
};
