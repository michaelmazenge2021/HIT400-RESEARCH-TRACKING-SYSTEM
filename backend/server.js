require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const { logger } = require("./middleware/logEvents");
const errorHandler = require("./middleware/errorHandler");
const verifyJWT = require("./middleware/verifyJWT");
const cookieParser = require("cookie-parser");
const credentials = require("./middleware/credentials");
const mongoose = require("mongoose");
const connectDB = require("./config/dbConn");
const PORT = process.env.PORT || 3500;
const fs = require("fs");
const pdfparse = require("pdf-parse");
const multer = require("multer");
const PDFParser = require("pdf2json");
const helmet = require("helmet");
//const PdfData = require("./model/pdfData");



// Get all the filenames from the patients folder
// Example data
// Route to search for a user by name

const dataBuffer = fs.readFileSync("./Automatic water level indicator Project.pdf");

// Connect to MongoDB
connectDB();

// custom middleware logger
app.use(logger);

app.use(helmet());
// Handle options credentials check - before CORS!
// and fetch cookies credentials requirement
app.use(credentials);

// Cross Origin Resource Sharing
app.use(cors(corsOptions));

// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }));

// built-in middleware for json
app.use(express.json());

//middleware for cookies
app.use(cookieParser());

//serve static files
app.use("/", express.static(path.join(__dirname, "/public")));
pdfparse(dataBuffer).then(function (data) {
  // number of pages
  //console.log(data.numpages);
  // number of rendered pages
  //console.log(data.numrender);
  // PDF info
  console.log(data.info);
  const date_created = (data.info.CreationDate);
  
 // const  keywords = data.info.Keywords.split(' ')
  //console.log(keywords);
  // PDF metadata
  console.log(data.metadata);
  // PDF.js version
  // check https://mozilla.github.io/pdf.js/getting_started/
  //console.log(data.version);
  // PDF text
  // console.log(data.text);
});
// default render callback
function render_page(pageData) {
  //check documents https://mozilla.github.io/pdf.js/
  let render_options = {
    //replaces all occurrences of whitespace with standard spaces (0x20). The default value is `false`.
    normalizeWhitespace: false,
    //do not attempt to combine same line TextItem's. The default value is `false`.
    disableCombineTextItems: false,
  };

  return pageData.getTextContent(render_options).then(function (textContent) {
    let lastY,
      text = "";
    for (let item of textContent.items) {
      if (lastY == item.transform[5] || !lastY) {
        text += item.str;
      } else {
        text += "\n" + item.str;
      }
      lastY = item.transform[5];
    }
    return text;
  });
}

let options = {
  pagerender: render_page,
};

pdfparse(dataBuffer, options).then(function (data) {
  console.log(data.metadata);
  //use new format
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/files");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + file.originalname);
  },
});

require("./pdfDetails");
const PdfSchema = mongoose.model("PdfDetails");
const upload = multer({ storage: storage });

app.post("/upload", upload.single("file"), async (req, res) => {
  console.log(req.file);
  const abstract = req.body.Abstract;
 // const reference = req.body.Reference;
  const faculty = req.body.faculty;
  const filePath = req.file.path;
const dept = req.body.department;
const filename = req.file.filename


  // Extract PDF metadata using pdf-parse

  pdfparse(filePath).then(async function (data) {
    
    console.log(data.info.Title)
   const title = data.info.Title;
   const subject = data.info.Subject;
   const pages = data.numrender;
    const author = data.info.Author;
    
    const  keywords = data.info.Keywords.split(' ')
    const date_created = data.info.CreationDate;
    const uniqueSuffix = Date.now();
    const dateString = date_created;

// Extract the relevant components
const year = dateString.substr(2, 4);
const month = parseInt(dateString.substr(6, 2)) - 1; // Month is zero-based
const day = dateString.substr(8, 2);
const hour = dateString.substr(10, 2);
const minute = dateString.substr(12, 2);
const second = dateString.substr(14, 2);

// Create the Date object
const date = new Date(year, month, day, hour, minute, second);


  try {
    await PdfSchema.create({ 
      "title": title,
      "subject": subject ,
      "author": author,
      "keywords": keywords,
      "abstract": abstract,
      "date_created": date,
      "date_posted": uniqueSuffix ,
      "faculty":  faculty,
      "pages": pages,
      "department": dept,
      "file": filename,
     
     

     });
    res.send({ status: "ok" });
  } catch (error) {
    res.json({ status: error });
  }
});  });

app.get("/get-files", async (req, res) => {
  try {
    PdfSchema.find({}).then((data) => {
      res.send(data);
    });
  } catch (error) {}
});
app.get('/download-pdf/:filename', (req, res) => {
  const { filename } = req.params;

  const filePath = path.join('./files', 'pdfs', filename);

  if (fs.existsSync(filePath)) {
    res.download(filePath, (err) => {
      if (err) {
        console.error('Error downloading PDF:', err);
        res.status(500).json({ error: 'Failed to download PDF' });
      }
    });
  } else {
    res.status(404).json({ error: 'PDF not found' });
  }
});
//apis----------------------------------------------------------------
app.get("/", async (req, res) => {
  res.send("Success!!!!!!");
});

// routes
app.use("/search", require("./routes/search"));
app.use("/", require("./routes/root"));
app.use("/register", require("./routes/register"));
app.use("/auth", require("./routes/auth"));
app.use("/refresh", require("./routes/refresh"));
app.use("/logout", require("./routes/logout"));

app.use(verifyJWT);
app.use("/users", require("./routes/api/users"));

app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ error: "404 Not Found" });
  } else {
    res.type("txt").send("404 Not Found");
  }
});

app.use(errorHandler);

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
