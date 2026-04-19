import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb://admin_Josias:JoshLeon12181@ac-qiuz1m6-shard-00-00.57my5hr.mongodb.net:27017,ac-qiuz1m6-shard-00-01.57my5hr.mongodb.net:27017,ac-qiuz1m6-shard-00-02.57my5hr.mongodb.net:27017/ecommerce?ssl=true&replicaSet=atlas-rr1wfz-shard-0&authSource=admin&appName=Cluster0",
    );

    console.log("MongoDB conectado 🔥");
  } catch (error) {
    console.error("Error conectando MongoDB:", error);
    process.exit(1);
  }
};

export default connectDB;
