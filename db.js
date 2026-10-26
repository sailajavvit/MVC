import mongoose from "mongoose";

const connectDB = async (mongoURI, dbName) => {
    if (!mongoURI) {
        throw new Error("MONGO_URI is missing in .env");
    }

    try {
        await mongoose.connect(mongoURI, {
            dbName: dbName
        });

        await mongoose.connection.db
            .collection("users")
            .findOne({ _id: "__connection_check__" });

        console.log("Connected to MongoDB");
    }
    catch (err) {
        console.error("Problem while connecting MongoDB:", err.message);

        if (err.message.includes("requires authentication")) {
            console.error("Add MongoDB username/password to MONGO_URI, for example:");
            console.error("MONGO_URI=mongodb://<username>:<password>@localhost:27017/<database>?authSource=admin");
        }

        throw err;
    }
};

export default connectDB;
