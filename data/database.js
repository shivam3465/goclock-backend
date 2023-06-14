import mongoose from "mongoose";

export const connectDB=()=>{    
    mongoose.connect(process.env.MONGODB_URL, {dbName: 'goClock'}).then(()=> console.log('database connected')).catch(err => console.log(err));
}