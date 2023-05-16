require("./config/config");
require("./models/db");
require('./config/passportConfig');

const express = require("express");
const bodyParser = require("body-parser");
const passport = require("passport");
const cokieParser = require('cookie-parser');
const cors = require("cors");
const PORT = process.env.PORT || 3000;
const { links } = require("express/lib/response");
const rtIndex = require("./routes/index.route")
var app = express()

app.use(express.urlencoded({ extended: false })); 
app.use(passport.initialize());
app.use(express.json());
app.use(cors({ origin: ["https://ayat-constructionv11.herokuapp.com","https://www.aayat-construction.in"], 

methods:["GET","POST","DELETE","PUT"],
origin:true,
credentials: true }))










// app.use((req, res, next) => {
//     res.header("Access-Control-Allow-Origin", '*');
//     res.header(
//       "Access-Control-Allow-Headers",
//       "Origin, X-Requested-With, Content-Type, Accept, Authorization"
//     );
//     if (req.method === 'OPTIONS') {
//         res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
//         return res.status(200).json({});
//     }
//     next();
//   });
app.use('/upload', express.static('uploads'));
app.use('/task', express.static('uploads/task'));
app.use(require('./routes/index.route'));
app.use((err,req,res,next)=>{
    if(err.name === 'ValidationError'){
            var valError =[];
            Object.keys(err.errors).forEach(key => valError.push(err.errors[key].message));
            res.status(422).send(valError)
    }
})

if(process.env.NODE_ENV==="production"){
    app.use(express.static("client/dist"))
    const path = require("path");
    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','dist','index.html'))
    })
}
app.listen(PORT,()=> console.log(`server started at port :${PORT}`))