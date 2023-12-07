const app = require("express")();
const bodyParser = require("body-parser");
const cors = require("cors");
const multer = require("multer");

port = 8200;

app.use(cors());
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));

const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      if (file.fieldname === "pdfs") {
        cb(null, "Pdf");
      } else {
        cb(null, "uploads"); // folder name to save data on server
      }
    },
    filename: function (req, file, cb) {
      let splitedArray = file.originalname.split(".");
      let fileExtension = splitedArray.pop();
      let newFileName =
        splitedArray.join(".") + "_" + Date.now() + "." + fileExtension;
      cb(null, newFileName);
    },
  }),
});

app.listen(port, () => {
  console.log("server started");
});

app.post(
  "/profile",
  upload.fields([
    {
      name: "images",
    },
    {
      name: "pdfs",
    },
  ]),
  (req, res) => {
    // images : "images" must be in key of formdata
    //   console.log("request files: ", req.files);
    console.log("request files: ", req.files);
    res.status(200).send("profile route acceses");
  }
);
