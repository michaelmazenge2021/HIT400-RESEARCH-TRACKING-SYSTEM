const pdfparse = require("pdf-parse");
const multer = require("multer");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "../files");
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now();
      cb(null, uniqueSuffix + file.originalname);
    },
  });
  const upload = multer({ storage: storage });
const handleUpload = (upload.single("file"), async (req, res) => {
    console.log(req.file);
    const abstract = req.body.Abstract;
    const reference = req.body.Reference;
   // const filePath = req.file.path;
  
   //console.log(filePath)
  
     // Extract PDF metadata using pdf-parse
    
   //  pdfparse(filePath).then(function (data) {
   //   console.log(data.info.Title);
      console.log(abstract);
  
 //    });
  
  });

module.exports = { handleUpload };