const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
    {
        username: { type: String},
        email: {type: String, reqired: true, unique: true}, 
        password: {type: String, reqired: true},
        profilePic: {type: String, default: ""},
        isAdmin: {type: Boolean, default: false},
    }, 
    {timestamps: true}
);

module.exports = mongoose.model("User", UserSchema);