// // backend/models/User.js
// const mongoose = require('mongoose');

// // Create user schema
// const UserSchema = new mongoose.Schema({
//   email: {
//     type: String,
//     required: true,
//     unique: true,
//   },
//   password: {
//     type: String,
//     required: true,
//   },
// });

// const User = mongoose.model('User', UserSchema);

// module.exports = User;


const { MongoClient, ServerApiVersion } = require("mongodb")

const uri = `mongodb+srv://dhruv777:dhruv777@cluster0.ejs1q.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

const client = new MongoClient(uri,
  {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true
    }
  }
)

const DBNAME = "DopaTrack"
client.connect()
console.log("Started successfully")

const db = client.db(DBNAME)

const addUser = async (username, password)=>{
  try {
    const signup = db.collection("signup")

    signup.insertOne({user: username, pass: password})
    console.log("Added successfully")

  }
  catch(e) {
    console.log("Error", e)
  }
}

module.exports = { addUser }