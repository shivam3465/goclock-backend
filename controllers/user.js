import { User } from "../model/user.js";
import bcrypt from "bcrypt";
import { setCookies } from "../utils/setCookies.js";

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      res
        .status(400)
        .json({ sucess: false, message: "wrong email or password " });
    } else {
      const isEqual = bcrypt.compare(password, user.password);
      if (isEqual) {
        setCookies(res, user.id, 60000 * 60 * 24 * 10, "Login successful");
      } else {
        res
          .status(400)
          .json({ succes: false, message: "wrong email or password" });
      }
    }
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

export const register = async (req, res) => {
  try {
    const { name, address, contactNumber, email, password, userType } = req.body;

    let user = await User.findOne({ email });
    const phone = await User.findOne({ contactNumber });

    if (user) {
      res
        .status(405)
        .json({ sucess: false, message: "Email already registered" });
    } else if (phone) {
      res
        .status(405)
        .json({ sucess: false, message: "Mobile number already registered" });
    } else {
      const hashedPasword = await bcrypt.hash(password, 10);
      user = await User.create({
        userType,
        name,
        address,
        contactNumber,
        email,
        password: hashedPasword,
      });      
      setCookies(
        res,
        user.id,
        60000 * 60 * 24 * 10,
        "User registered successfully"
      );
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "there was some error" });
  }
};

export const logout= async (req,res) => {
    const { token } = req.cookies;
        
    if (!token) {
        res.status(400).json({ success: false, message: "Already logged out" });
    } 
    else setCookies(res,"",0,"Logout successfully");
}

export const message =async (req, res) =>{
   res.json({
    success:true,
    messages: req.user.message
   })
}

export const currentUser = async (req, res) =>{
  res.json({user:req.user})
}