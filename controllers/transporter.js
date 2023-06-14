import { User } from "../model/user.js";
import { sendError } from "../utils/sendError.js";

export const sendMessage=async (req,res)=>{
    try {
        const {email,message,price,orderId,from,to,quantity,address}=req.body;    

        // console.log(first) yaha pe kaam karna hai ki message bheja kyu nahi rha hai
        const messageObject={
            message: message,
            from : from,
            to: to,
            quantity: quantity,
            address: address,            
            orderId: orderId,
            price: price,
            senderMail: req.user.email
        };
        const user=await User.findOne({email});
        if(user){
            user.message.push(messageObject);
            user.save();
            res.json({success: true,message: "messagae sent successfully"});            
        }
        else{
            sendError(res,404,"User not found")
        }        
    } catch (error) {
        sendError(res,401,"User not found")
    }    
}

export const allTransporter=async (req,res)=>{
    const allTransporter = await User.find({userType: "transporter"}).select(["-message","-userType","-_id"]);
    // console.log(allTransporter);
    res.json({success:true,transporter:allTransporter});
}