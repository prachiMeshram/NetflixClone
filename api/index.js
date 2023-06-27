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