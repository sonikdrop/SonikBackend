import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MONGODB_URL = process.env.MONGODB_URL;

if (!MONGODB_URL) {
    throw new Error("MONGODB_URL environment variable is not defined");
}

// MongoDB connection options
const mongooseOptions = {
    serverSelectionTimeoutMS: 30000, // 30 seconds
    socketTimeoutMS: 45000, // 45 seconds
    connectTimeoutMS: 30000, // 30 seconds
    maxPoolSize: 10, // Maintain up to 10 socket connections
    minPoolSize: 5, // Maintain a minimum of 5 socket connections
    maxIdleTimeMS: 30000, // Close connections after 30 seconds of inactivity
};

const connectDB = async () => {
    try {
        // Configure mongoose to disable buffering
        mongoose.set('bufferCommands', false);
        
        await mongoose.connect(MONGODB_URL, mongooseOptions);
        console.log("✅ Connected to MongoDB successfully");
        
        // Handle connection events
        mongoose.connection.on('error', (err) => {
            console.error('❌ MongoDB connection error:', err);
        });
        
        mongoose.connection.on('disconnected', () => {
            console.log('⚠️ MongoDB disconnected');
        });
        
        mongoose.connection.on('reconnected', () => {
            console.log('✅ MongoDB reconnected');
        });
        
        return mongoose.connection;
    } catch (error) {
        console.error('❌ MongoDB connection failed:', error);
        process.exit(1);
    }
};

export default connectDB;