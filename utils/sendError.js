export const sendError=(res,code=404,message="")=>{
    res.status(code).json({success: false, message: message});
}