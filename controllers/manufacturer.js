import { User } from "../model/user.js"
import { sendError } from "../utils/sendError.js";

export const allManufacturer=async (req,res)=>{
    const users=await User.find({userType: "manufacturer"}).select(['-message', '-_id'])    
    res.json({sucess: true, users: users});
}

export const sendMessageManufacturer= async (req,res)=>{
    try {
        const {orderId,email,quantity,to,from,address}=req.body;    
        const messageObject={
            orderId: orderId,
            quantity: quantity,
            to: to,
            from : from, 
            address : address,
            senderMail: req.user.email,
            checked: false
        };
        
        const user=await User.findOne({email});
        user.message.push(messageObject);
        user.save();        
        res.json({success: true,message: "Message sent successfully"});
        
    } catch (error) {
        sendError(res,401,"User not found")
    } 
}