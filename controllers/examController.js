import Test from "../models/examSchema.js";
import Errorhandler from "../utils/errorhandler.js";


export const createExam = async (req, res, next) => {
   
    try {
  
      const result = await Test.create(req.body);
if(!result){
    return next(new Errorhandler("Exam Not Created", 400));
}
      res.status(200).json({
        success: true,
        message: "Exam Created Successfully",
        result,
      });
    } catch (error) {
      next(error);
    }
  };

  export const getAllExams= async(req,res, next) => {
 
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
      const totalTest = await Test.countDocuments(match);
  
      // Perform aggregation
      const Tests = await Test.aggregate(pipeline);
  
      res.json({
        total: totalTest,
        page: Number(page),
        limit: Number(limit),
        Tests,
      });
    } catch (error) {
      next(error);
    }
    };

    export const updateExam= async(req,res, next) => {
        const examId = req.params.id;
        const updateData = req.body;
      
        try {
        
          const updatedExam = await Test.findByIdAndUpdate(examId, updateData, {
            new: true, 
          });
      
          if (!updatedExam) {
            return next(new Errorhandler("Exam Not Found", 400));
          }
      
          res.status(200).json({
            success: true,
            message: "Exam Updated Successfully",
            updatedExam,
          });
        } catch (error) {
            next(error);
        }
    }

   export const deleteExam=async(req,res, next) => {
    const examId = req.params.id;

    try {
   
      const deletedExam= await Test.findByIdAndDelete(examId);
  
      if (!deletedExam) {
        return next(new Errorhandler("Exam Not Found", 400));
      }
  
      res.status(200).json({
        success: true,
        message: "Exam Deleted Successfully",
        
      });
    } catch (error) {
   
        next(error);
    }
   }

   export const getParticularExam=async(req,res, next) => {
    const examId = req.params.id;

    try {
   
      const getParticularExam = await Test.findById(examId);
  
      if (!getParticularExam) {
        return next(new Errorhandler("Exam Not Found", 400));
      }
  
      res.status(200).json({
        success: true,
        message: "Exam Deleted Successfully",
        data:getParticularExam
        
      });
    } catch (error) {
   
        next(error);
    }

   }
   