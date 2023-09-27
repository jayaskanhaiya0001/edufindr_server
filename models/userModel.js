import mongoose  from "mongoose";

const userSchema = new mongoose.Schema({
    name: {type: String, default: ""},
    email: {type: String, default: ""},
    phone: {type: Number, required: true },
   // password: {type: String, required: true, select: false},
    // dateOfBirth: {type: String},
    // bio: {type: String, default: ""},
    // phone: {type: Number, default: "" },
    // education: {type: String, default: ""},
    // deactivateId: {type : Boolean, default: false},
    createdAt: {type: Date, default: Date.now()},
    updatedAt: {type: Date, default: Date.now()}
})

const User = mongoose.model("User", userSchema);

export default User;