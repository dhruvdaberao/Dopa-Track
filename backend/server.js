// backend/server.js
// const express = require('express');
// const mongoose = require('mongoose');
// const dotenv = require('dotenv');
// const authRoutes = require('./routes/auth');

// dotenv.config();
 
//   // Loads .env file

// const app = express();

// // Middleware
// app.use(express.json());  // To parse incoming JSON data

// // MongoDB connection
// mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log('Connected to MongoDB'))
//   .catch((error) => console.error('MongoDB connection error:', error));

// // Routes
// app.use('/api/auth', authRoutes);

// // Start server
// app.listen(5000, () => {
//   console.log('Server is running on port 5000');
// });


// const express = require('express');
// const mongoose = require('mongoose');
// const dotenv = require('dotenv');
// const cors = require('cors');
// const authRoutes = require('./routes/auth');

// // Load .env file
// dotenv.config();

// // Get environment variables
// const MONGO_URI = process.env.MONGO_URI;
// const PORT = process.env.PORT || 5000;

// // Debugging: Check if MONGO_URI is being loaded correctly
// console.log("🔍 MONGO_URI:", MONGO_URI);

// // Check if MONGO_URI is undefined
// if (!MONGO_URI) {
//   console.error("❌ ERROR: MONGO_URI is not defined! Check your .env file.");
//   process.exit(1);
// }

// const app = express();

// // Middleware
// app.use(express.json());
// app.use(cors()); // ✅ Fix potential CORS issues

// // Connect to MongoDB
// mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log('✅ Connected to MongoDB'))
//   .catch((error) => {
//     console.error('❌ MongoDB connection error:', error);
//     process.exit(1);
//   });

// // Routes
// app.use('/api/auth', authRoutes);

// // Start Server
// app.listen(PORT, () => {
//   console.log(`🚀 Server is running on port ${PORT}`);
// });



// const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = "mongodb+srv://<dbnam>:<dbpass>@cluster0.ejs1q.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });

// async function run() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     await client.db("admin").command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir);





     

// let dbname = "dhruv777"
// let dbpass = "dhruv777"


// const express = require('express');
// const { MongoClient, ServerApiVersion } = require('mongodb');
// const dotenv = require('dotenv');
// const cors = require('cors');
// const authRoutes = require('./routes/auth');

// // MongoDB Atlas connection string (replace with your own credentials if needed)
// const uri = `mongodb+srv://${dbname}:${dbpass}@cluster0.ejs1q.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });

// async function run() {
//   try {
//     // Connect the client to the server
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     await client.db("admin").command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");

//     // After successful connection, start the server
//     const app = express();
//     // Middleware
//     app.use(express.json());
//     app.use(cors()); // CORS handling to avoid issues with API requests

//     // Routes
//     app.use('/api/auth', authRoutes);

//     const db = client.db("dopaminePro")
//     const coll = db.collection("dopamine")

    
    

//     // Start Server
//     const PORT = process.env.PORT || 5000;
//     app.listen(PORT, () => {
//       console.log(`🚀 Server is running on port ${PORT}`);
//     });

//   } catch (error) {
//     console.error("❌ MongoDB connection error:", error);
//     process.exit(1); // Exit the process on failure
//   }
// }

// // Call the run function to establish the connection
// run();




// let dbname = "dhruv777";
// let dbpass = "dhruv777";

// const express = require('express');
// const { MongoClient, ServerApiVersion } = require('mongodb');
// const cors = require('cors');
// const authRoutes = require('./routes/auth');

// // MongoDB Atlas connection string with provided credentials
// const uri = `mongodb+srv://dhruv777:${dbpass}@cluster0.ejs1q.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });

// async function run() {
//   try {
//     // Connect the client to the server
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     await client.db("admin").command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");

//     // After successful connection, start the server
//     const app = express();

//     // Middleware
//     app.use(express.json());
//     app.use(cors()); // CORS handling to avoid issues with API requests

//     // Routes
//     app.use('/api/auth', authRoutes);

//     // Access the MongoDB database and collection
//     const db = client.db("dopaminePro"); // Connect to the "dopaminePro" database
//     const coll = db.collection("dopamine"); // Access the "dopamine" collection

    

//     // Start Server
//     const PORT = process.env.PORT || 5000;
//     app.listen(PORT, () => {
//       console.log(`🚀 Server is running on port ${PORT}`);
//     });

//   } catch (error) {
//     console.error("❌ MongoDB connection error:", error);
//     process.exit(1); // Exit the process on failure
//   }
// }

// // Call the run function to establish the connection
// run();


// const express = require("express")
// const { addUser } = require("./models/User")
// const cors = require("cors")
// const router = express.Router()

// router.post("/addUser", async (req, res)=>{
//   let user = req.body.email
//   let password = req.body.password
//   console.log(user + " " + password)
//   await addUser(user, password)
// })


// const app = express();

// app.use(cors())
// app.use(express.json());

// // Routes
// app.use('/api', router);

// app.listen(5000, ()=>{
//   console.log("Server Started")
// })




const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const authRoutes = require("./auth");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("Database Connected"))
  .catch(err => console.log(err));

app.use("/api/auth", authRoutes);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
