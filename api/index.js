const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require ("cors");
app.use(cors());
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const movieRoute = require("./routes/movie");
const userRoute = require("./routes/user");
const listRoute = require("./routes/list");

dotenv.config();

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true,
})
.then(() => console.log("DB connection successful"))
.catch((err) => console.log(err))

app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/movie", movieRoute);
app.use("/api/user", userRoute);
app.use("/api/list", listRoute);

app.listen(process.env.PORT, () => {console.log("server is listening")});



// // Import required modules
// const express = require("express"); // Import the Express module
// const app = express(); // Create an instance of the Express application
// const dotenv = require("dotenv"); // Load environment variables from .env file
// const cors = require("cors"); // Enable Cross-Origin Resource Sharing

// app.use(cors()); // Enable CORS for the app

// const mongoose = require("mongoose"); // Import the Mongoose module for MongoDB connection
// const authRoute = require("./routes/auth"); // Import the authentication route handler
// const movieRoute = require("./routes/movie"); // Import the movie route handler
// const userRoute = require("./routes/user"); // Import the user route handler
// const listRoute = require("./routes/list"); // Import the list route handler

// dotenv.config(); // Load environment variables from .env file

// // Connect to the MongoDB database
// mongoose
//   .connect(process.env.MONGO_URL, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     // useCreateIndex: true, // Optionally enable create index (deprecated)
//   })
//   .then(() => console.log("DB connection successful")) // Database connection successful
//   .catch((err) => console.log(err)); // Database connection error

// app.use(express.json()); // Enable parsing of JSON data in request body

// // Route configuration
// app.use("/api/auth", authRoute); // Mount the authentication route at /api/auth
// app.use("/api/movie", movieRoute); // Mount the movie route at /api/movie
// app.use("/api/user", userRoute); // Mount the user route at /api/user
// app.use("/api/list", listRoute); // Mount the list route at /api/list

// app.listen(process.env.PORT, () => {
//   console.log("Server is listening"); // Start the server and listen for requests on specified port
// });
