
var express = require('express');

/* 
If we created another file like myApp.js and keep all main parts in that then we need to require("./myapp"); in app variable 
And in myApp.js file at the end write 
model.export = app;
*/
var app = express();

var cors = require('cors');
require('dotenv').config();


app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
    res.sendFile(process.cwd() + '/views/index.html');
});

// To find information about file which is to get uploading then we must use middleware like multer which handle multipart/form-data and also needed in html form tag we must add enctype="multipart/form-data" if form tag
const multer = require("multer");

let resObject = {};
app.post("/api/fileanalyse", multer().single("upfile"), (req, res)=>{
  resObject["name"] = req.file.originalname;
  resObject["type"] = req.file.mimetype;
  resObject["size"] = req.file.size;
  res.json(resObject);
});

// We can use const upload = multer({ dest: 'uploads/' }) if we want to do something with uploading file that time use upload.single("upfile") as a middleware

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});

