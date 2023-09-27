import mongoose from "mongoose";

const connectDatabase = () => {
  console.log("Himanshu");
  mongoose
    .connect(process.env.DB_URI)
    .then((data) => {
      console.log(`Mongodb connected with server ${data.connection.host}`);
    })
    .catch((error) => {
      console.log(error, "error");
    });
};

export default connectDatabase;
