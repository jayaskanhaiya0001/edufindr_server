import mongoose  from "mongoose";

const testSchema = new mongoose.Schema({
  

  totalTest: { type: String, required: true },
  freeTest: { type: String, required: true },
  title: { type: String, required: true },
  alreadyEnrolled: { type: Number, default: 0 },
  price: { type: Number, required: true },
  rating: { type: Number, default: 0 },
  languages: [{description:{ type: String, required: true }}],
  about: { type: String, required: true },
  highlights: [
 {
   description: { type: String, required: true },
 },
],
testDivision: [
  {
    key: { type: String, required: true },
    value: { type: String, required: true },
  },
],

  category:{type: String, required: true},
  Exam:{type: String, required: true},
  createdAt: { type: Date, default: Date.now() },
  updatedAt: { type: Date, default: Date.now() }
})

const Test = mongoose.model('Test', testSchema);

export default Test;