const mongoose = require("mongoose");

const PdfDetailsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    
  },
  subject: {
      type: String,
    
  },
  author: {
      type: String,
     
  },
  keywords: {
      type: Array,
    
  },
  abstract: {
      type: String,
    
  },
  date_created: {
    type: Date,
  
},
  date_posted: {
      type: Date,
    
  },
  faculty: {
      type: Number,
    
  },
 
  pages: {
      type: Number,
    
  },
  department: {
    type: Number,
  
},
file: {
    type: String,
}
  },
  { collection: "PdfDetails" }
);

module.exports = mongoose.model("PdfDetails", PdfDetailsSchema);

