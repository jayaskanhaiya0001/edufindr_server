import Course from "../models/courseSchema.js";
import Errorhandler from "../utils/errorhandler.js";
import getDataUri from "../utils/dataUri.js";
import cloudinary from "cloudinary"


export const createCourse = async (req, res, next) => {
   
    try {
      const file=req.file;
      let result;
      if(file!=undefined){
      const fileUri=getDataUri(file)
      const formData = JSON.parse(req.body.formData);
      const uploadedFile = await cloudinary.v2.uploader.upload(fileUri.content);
    result = await Course.create({...formData, image:uploadedFile.url});
      }
      else{
        const formData = JSON.parse(req.body.formData);
        result = await Course.create(formData)
      }
if(!result){
    return next(new Errorhandler("Course Not Created", 400));
}
      res.status(200).json({
        success: true,
        message: "Course Created Successfully",
        result,
      });
    } catch (error) {
      next(error);
    }
  };

  export const getAllCourses= async(req,res, next) => {
   
    const { page = 1, limit = 10, sort = '-rating', search, exam, category } = req.query;

    // Build the aggregation pipeline based on filters and search
    const pipeline = [];
  
    // Match stage for filters and search
    const match = {};
    if (search) {
      match.title = { $regex: search, $options: 'i' };
    }
    if (exam) {
      match.Exam = exam;
    }
    if (category) {
      match.category = category;
    }
    if (Object.keys(match).length > 0) {
      pipeline.push({ $match: match });
    }
  
    // Sort stage
    pipeline.push({ $sort: { [sort]: 1 } });
  
    // Pagination stages
    const skip = (page - 1) * limit;
    pipeline.push({ $skip: skip });
    pipeline.push({ $limit: parseInt(limit) });
  
    try {
      // Get total count for pagination
      const totalCourses = await Course.countDocuments(match);
  
      // Perform aggregation
      const courses = await Course.aggregate(pipeline);
  
      res.json({
        total: totalCourses,
        page: Number(page),
        limit: Number(limit),
        courses,
      });
    } catch (error) {
      next(error);
    }
    };

    export const updateCourse= async(req,res, next) => {
        const courseId = req.params.id;
        const updateData = req.body;
        
      
        try {
          const file=req.file;
          let updatedCourse;
          if(file!=undefined){
          const formData = JSON.parse(req.body.formData);
          const fileUri=getDataUri(file)
          const uploadedFile = await cloudinary.v2.uploader.upload(fileUri.content);
          
          updatedCourse = await Course.findByIdAndUpdate(courseId, {...formData,image:uploadedFile.url}, {
            new: true, 
          });}
          else{
            const formData = JSON.parse(req.body.formData);
            updatedCourse = await Course.findByIdAndUpdate(courseId, formData, {
              new: true, 
            })
          }
      
          if (!updatedCourse) {
            return next(new Errorhandler("Courses Not Found", 400));
          }
      
          res.status(200).json({
            success: true,
            message: "Course Updated Successfully",
            updatedCourse,
          });
        } catch (error) {
            next(error);
        }
    }

   export const deleteCourse=async(req,res, next) => {
    const courseId = req.params.id;

    try {
   
      const deletedCourse = await Course.findByIdAndDelete(courseId);
  
      if (!deletedCourse) {
        return next(new Errorhandler("Courses Not Found", 400));
      }
  
      res.status(200).json({
        success: true,
        message: "Course Deleted Successfully",
        
      });
    } catch (error) {
   
        next(error);
    }
   }

   export const getParticularCourse=async(req,res, next) => {
    const courseId = req.params.id;

    try {
   
      const getParticularCourse = await Course.findById(courseId).populate('mentorNames._id');;
  
      if (!getParticularCourse) {
        return next(new Errorhandler("Courses Not Found", 400));
      }
  
      res.status(200).json({
        success: true,
        message: "Course Deleted Successfully",
        data:getParticularCourse
        
      });
    } catch (error) {
   
        next(error);
    }

   }
   export const getCategoryOfCourse=async(req,res, next) => {
    try {
      const categories = await Course.distinct('category');
      const examsByCategory = {};
  
      for (const category of categories) {
        const exams = await Course.find({ category }).distinct('Exam');
        examsByCategory[category] = exams;
      }
      res.status(200).json({
        success: true,
        message: "Course Catagoies",
        data:examsByCategory
        
      });
     
    } catch (error) {
      next(error);
    }
   }