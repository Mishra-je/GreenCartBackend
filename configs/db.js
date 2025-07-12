// // import mongoose from 'mongoose'

// // const connectDB = async() => {
// //     try {
// //         mongoose.connection.on('connected',() => console.log("Database connected !"))

// //       await mongoose.connect(`${process.env.MONGO_URI}/greencart`, {
// //   useNewUrlParser: true,
// //   useUnifiedTopology: true,
// // });
// //     } catch (error) {
// //         console.log(error.message);
// //     }
// // }


// // export default connectDB;



// import mongoose from 'mongoose';
// import dotenv from 'dotenv';
// dotenv.config();

// const connectDB = async () => {
//   try {
//     mongoose.connection.on('connected', () =>
//       console.log('✅ MongoDB connected!')
//     );

//     await mongoose.connect(`${process.env.MONGO_URI}/greencart`, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//   } catch (error) {
//     console.error('❌ MongoDB connection error:', error);
//   }
// };

// export default connectDB;

import mongoose from 'mongoose';

const MONGODB_URI = `${process.env.MONGO_URI}/greencart`;

if (!MONGODB_URI) {
  throw new Error(
    '❌ Please define the MONGO_URI environment variable inside .env'
  );
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }).then((mongoose) => {
      console.log('✅ MongoDB connected!');
      return mongoose;
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export default connectDB;

