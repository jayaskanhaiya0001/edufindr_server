import mongoose from "mongoose";

const leadCollectionSchema = new mongoose.Schema({
  mobileNumber: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        // Remove non-numeric characters from the input and check if the length is <= 10
        return /^\d{1,10}$/.test(v.replace(/\D/g, ""));
      },
      message: props => `${props.value} is not a valid mobile number (up to 10 digits)`
    }
  },
  createdAt: { type: Date, default: Date.now() },
  updatedAt: { type: Date, default: Date.now() }
});

const LeadCollection = mongoose.model('LeadCollection', leadCollectionSchema);

export default LeadCollection;






