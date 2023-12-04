const app = require('express')()
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');

port = 8200;

app.use(cors())
app.use(bodyParser.json());

const upload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, "uploads");
        },
        filename: function (req, file, cb) {
            cb(null, file.filename + "-" + Date.now() + ".jpg");
        },
    }),
})

app.listen(port, () => { console.log("server started"); })

app.post('/profile', upload.single('user_file'), (req, res) => {
    console.log('request object', req.body);
    res.status(200).send('profile route acceses')
}) 