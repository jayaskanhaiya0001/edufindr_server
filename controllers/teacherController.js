
import Teacher from "../models/teacherSchema.js";
import Errorhandler from "../utils/errorhandler.js";
import mongoose from "mongoose";
import getDataUri from "../utils/dataUri.js";
import cloudinary from "cloudinary"

export const createTeacher = async (req, res, next) => {

    try {
let result;
      const file=req.file;
      if(file!=undefined){
      const fileUri=getDataUri(file)
      const formData = JSON.parse(req.body.formData);
      const uploadedFile = await cloudinary.v2.uploader.upload(fileUri.content);
       result = await Teacher.create({...formData,image:uploadedFile.url});}
       else{
        const formData = JSON.parse(req.body.formData);

        result = await Teacher.create(formData)
       }
if(!result){
    return next(new Errorhandler("Teacher Not Created", 400));
}
      res.status(200).json({
        success: true,
        message: "Teacher Created Successfully",
        result,
      });
    } catch (error) {
      next(error);
    }
  };

  export const updateTeacher= async(req,res, next) => {
    const teacherId = req.params.id;
    const updateData = req.body;
  let updatedTeacher;
    try {
      const file=req.file;
      if(file!=undefined){
      const fileUri=getDataUri(file)
      const formData = JSON.parse(req.body.formData);
      const uploadedFile = await cloudinary.v2.uploader.upload(fileUri.content);
     updatedTeacher= await Teacher.findByIdAndUpdate(teacherId, {...formData,image:uploadedFile.url}, {
        new: true, 
      });}

      else{
const formData = JSON.parse(req.body.formData);
console.log(formData,"helllo")
updatedTeacher= await Teacher.findByIdAndUpdate(teacherId,formData,{
  new:true
})
      }
  
      if (!updatedTeacher) {
        return next(new Errorhandler("Teacher Not Found", 400));
      }
  
      res.status(200).json({
        success: true,
        message: "Teacher Updated Successfully",
        updatedTeacher,
      });
    } catch (error) {
        next(error);
    }
}

export const deleteTeacher=async(req,res, next) => {
const teacherId = req.params.id;

try {

  const deletedTeacher = await Teacher.findByIdAndDelete(teacherId);

  if (!deletedTeacher) {
    return next(new Errorhandler("Teacher Not Found", 400));
  }

  res.status(200).json({
    success: true,
    message: "Teacher Deleted Successfully",
    
  });
} catch (error) {

    next(error);
}
}
export const getAllTeachers=async(req,res,next)=>{
    try {
        const teachers = await Teacher.find();
        res.status(200).json({
            success: true,
            message: "Teacher Deleted Successfully",
            data:teachers
          });
    } catch (error) {
       next(error)
    }
}


export const getParticularTeacher = async (req, res, next) => {
    try {
        const teacherId = req.params.id;

        // Use aggregation to fetch teacher details and courses
        const teacher = await Teacher.aggregate([
            { $match: { _id: new mongoose.Types.ObjectId(teacherId) } },
            {
                $lookup: {
                    from: 'courses', // Collection name for courses
                    localField: '_id',
                    foreignField: 'mentorNames._id', 
                    as: 'courses'
                }
            }
        ]);

        if (!teacher || teacher.length === 0) {
            return next(new Errorhandler("Teacher Not Found", 400));
        }

        res.status(200).json({
            success: true,
            message: "Teacher Found Successfully",
            data: teacher[0]
        });
    } catch (error) {
        next(error);
    }
};


