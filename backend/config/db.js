import mongoose from 'mongoose';

export const connectDB = async () => {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    console.warn('\n⚠️  [BloomTask Backend] MONGODB_URI is not set in backend/.env!');
    console.warn('👉 To connect a real database, add your MongoDB Atlas or local MongoDB connection string:');
    console.warn('   MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/bloomtask?retryWrites=true&w=majority\n');
    return false;
  }

  try {
    const conn = await mongoose.connect(uri);
    console.log(`🌸 [BloomTask MongoDB] Successfully connected to host: ${conn.connection.host}`);
    return true;
  } catch (error) {
    console.error(`❌ [BloomTask MongoDB] Connection error: ${error.message}`);
    console.warn('👉 Tip: Check your network connection, IP whitelist in MongoDB Atlas (e.g. 0.0.0.0/0), and credentials in backend/.env.');
    return false;
  }
};

mongoose.connection.on('disconnected', () => {
  console.log('🌱 [BloomTask MongoDB] Disconnected from database');
});

export default connectDB;
