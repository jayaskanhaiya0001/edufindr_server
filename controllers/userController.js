import Contact from "../models/contactSchema.js";
import LeadCollection from "../models/leadSchema.js";
import User from "../models/userModel.js";
import Errorhandler from "../utils/errorhandler.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const createUser = async (req, res, next) => {
  
    try {
      const { name, email, phone } = req.body;
      let user = await User.findOne({ phone: phone });
  
      if (user) return next(new Errorhandler("User already exists", 400));
        
      // if (password !== confirmPassword)
      // return next(new Errorhandler("Password didnt match", 400));

      // let hashedPassword = await bcrypt.hash(password, 10);
      // console.log(hashedPassword, "hash");
  
      const result = await User.create({
        name: name,
        email: email,
        phone: phone,
     
      });

      const token = jwt.sign(
        { userId: result._id ,name: result.name},
     process.env.JWT_SECRET_KEY, // Replace with your own secret key
        { expiresIn: process.env.JWT_KEY_EXPIRE } // Token expiration time
    );

    // Store the token in an HTTP-only cookie
    res.cookie('token', token, { httpOnly: true });

    res.status(201).json({
      success: true,
        message: 'User created successfully',
        user: result
    });
 
    } catch (error) {
      next(error);
    }
  };


  export const loginUser = async (req, res, next) => {
    try {
      // const { email, password } = req.body;

      // if (!email || !password) {
      //   return next(new Errorhandler("Enter both email and pass"), 400);
      // }
  
      // const user = await User.findOne({ email: email }).select("+password");
  
      // if (!user) return next(new Errorhandler("User dosent exist", 400));
  
      // let comparePassword = await bcrypt.compare(password, user.password);
  
      // if (!comparePassword)
      //   return next(new Errorhandler("Wrong email or password", 400));
  
      // const payload = {
      //   id: user._id,
      //   name: user.name,
      //   email: user.email
      // };
      // const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
      //   expiresIn: process.env.JWT_KEY_EXPIRE,
      // });
  
      // const options = {
      //   expire: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      //   httpOnly: true,
      // };
      // res.status(200).cookie("token", token, options).json({
      //   success: true,
      //   user,
      // });
      const { phone } = req.body;

      // Check if the provided phone number exists in the database
      const existingUser = await User.findOne({ phone });

      if (!existingUser) {
        return next(new Errorhandler("User doesn't Exist", 400));
      }

      // Generate a JWT token with a 5-day expiration
      const token = jwt.sign(
          { userId: existingUser._id, name: existingUser.name },
          process.env.JWT_SECRET_KEY, // Replace with your own secret key
          { expiresIn: process.env.JWT_KEY_EXPIRE } // Token expiration time
      );

      // Store the token in an HTTP-only cookie
      res.cookie('token', token, { httpOnly: true });

      res.status(200).json({
        success:true,
          message: 'Sign in successful',
          user: existingUser
      });
    } catch (error) {
      next(error);
    }
  
  };

  export const logOut = async (req, res, next) => {
    try {
      res.cookie("token", "", {
        expire: new Date(Date.now()),
        httpOnly: true,
      });
  
      res.status(200).json({
        success: true,
        message: "Logged Out successfully",
      });
    } catch (error) {
      next(error);
    }
  };

  export const changePassword = async (req, res, next) => {
    const { oldPassword, newPassword } = req.body;
  
    if (!oldPassword || !newPassword)
      return next(new Errorhandler("fill fields", 400));
  
    let user = await User.findOne({ _id: req.user.id }).select("+password");
    
    console.log(user, "user");
    const comparePassword = await bcrypt.compare(oldPassword, user.password);
  
    if (!comparePassword)
      return next(new Errorhandler("Password dint match", 400));
  
    let hashedPassword = await bcrypt.hash(newPassword, 10);
  
    let result = await User.findOneAndUpdate(
      { _id: req.user.id },
      { password: hashedPassword },
      { new: true }
    );
  
    res.cookie("token", "", {
      expire: new Date(Date.now()),
      httpOnly: true,
    });
  
    res.status(200).json({
      success: true,
      message: "password Changed and Logout user",
      result,
    });
  };
  
  export const leadCollection=async(req, res, next) => {
    try {
      const { mobileNumber } = req.body;
  
      // Validate mobileNumber (you can add more validation if needed)
      if (!/^\d{1,10}$/.test(mobileNumber.replace(/\D/g, ""))) {
        return next(new Errorhandler("Invalid mobile number format", 400));

      }
  
      const newLead = await LeadCollection.create({ mobileNumber });
      res.status(200).json({
        success: true,
        message: "Leads created successfully",
        data:newLead
      });
    } catch (error) {
      next(error)
    }
  }
  export const getAllLeads=async(req, res, next) => {
    try {
      const leads = await LeadCollection.find();
      res.status(200).json({
        success: true,
        message: "Leads Fetched successfully",
        data:leads
      });
    } catch (error) {
      next(error)
    }
  }

  export const getAllFormData=async(req, res, next) => {
    try {
      const leads = await Contact.find();
      res.status(200).json({
        success: true,
        message: "Form data Fetched successfully",
        data:leads
      });
    } catch (error) {
      next(error)
    }
  }
  export const FormCollection=async(req, res, next) => {
    try {
      const { phone } = req.body;
  
      // Validate mobileNumber (you can add more validation if needed)
      if (!/^\d{1,10}$/.test(phone.replace(/\D/g, ""))) {
        return next(new Errorhandler("Invalid mobile number format", 400));

      }
  
      const newLead = await Contact.create(req.body);
      res.status(200).json({
        success: true,
        message: "Form data created successfully",
        data:newLead
      });
    } catch (error) {
      next(error)
    }
  }