import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
     // userId : {type: mongoose.Schema.Types.ObjectId, ref: "User"},
     // friendsId: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
     // isFriend: {type: Boolean, default: false},
     mentorNames: [
      {
        _id: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher', required: true },
          name: { type: String, required: true }
      }
  ],
     courseDuration: { type: String, required: true },
     title: { type: String, required: true },
     alreadyEnrolled: { type: Number, default: 0 },
     price: { type: Number, required: true },
     rating: { type: Number, default: 0 },
     batchStarting: { type: Date, required: true },
     institute: { type: String, required: true },
     language: { type: String, required: true },
     image: {type: String, default:"" },
     about: { type: String, required: true },
     highlights: [
    {
      
      description: { type: String, required: true },
    },
  ],
     enrollmentEndDate: { type: Date, required: true },
     days: [
          {
            
            description: { type: String, required: true },
          },
        ],
     batches: [
     {
       
       description: { type: String, required: true },
     },
   ],
     features: [
          {
            
            description: { type: String, required: true },
          },
        ],
     category:{type: String, required: true},
     Exam:{type: String, required: true},
     createdAt: { type: Date, default: Date.now() },
     updatedAt: { type: Date, default: Date.now() }
})

const Course = mongoose.model("Course", courseSchema)

export default Course;