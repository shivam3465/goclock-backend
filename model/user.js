import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  userType: {
    type: String,
    require: true,
  },
  name: {
    type: String,
    require: true,
  },
  address: {
    type: String,
    require: true,
  },
  contactNumber: {
    type: Number,
    require: true,
    unqiue: true,
  },
  email: {
    type: String,
    require: true,
    unqiue: true,
  },
  password: {
    type: String,
    require: true,
    select: false,
  },
  message: {
    type: [{      
    }],    
  }
});

export const User = mongoose.model("User", userSchema);
