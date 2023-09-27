import mongoose from "mongoose";

const teacherSchema = new mongoose.Schema({
    name: { type: String, required: true },
    yearsOfExperience: { type: Number, required: true },
    designation: { type: String, required: true },
    studentsTaught: { type: Number, default: 0 },
    selections: { type: Number, default: 0 },
    about: { type: String },
    image: {
        type: String, default:""
      },
    highlights: [{ description:{type: String }}],
    educations: [{ 
        degree: { type: String },
        university: { type: String },
        year: { type: Number }
    }],
    experiences: [{
        position: { type: String },
        institution: { type: String },
        year: { type: Number }
    }]
});

const Teacher = mongoose.model('Teacher', teacherSchema);

export default Teacher;