const mongoose = require("mongoose");

const ListSchema = new mongoose.Schema(
    {
        title: { type: String, required: true, unique: true},
        type: {type: String},
        genre: {type: String},
        content: {type: Array},
    }, 
    {timestamps: true}
);

module.exports = mongoose.model("List", ListSchema);





// // Importing the mongoose library for MongoDB integration
// const mongoose = require("mongoose");

// // Defining the schema for the "List" collection
// const ListSchema = new mongoose.Schema(
//     {
//         title: { type: String, required: true, unique: true },
        
//         type: { type: String },
        
//         genre: { type: String },
        
//         content: { type: Array },
//     }, 
//     // Adding timestamps to the schema, which automatically adds "createdAt" and "updatedAt" fields
//     { timestamps: true }
// );

// // Creating and exporting the "List" model based on the defined schema
// module.exports = mongoose.model("List", ListSchema);
