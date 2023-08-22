const express=require('express');
let app = express();
const sessions = require('express-session');
const cookieparser = require('cookie-parser');
const path = require('path');
const bodyParser = require('body-parser');
app.set('view engine', 'ejs');
app.set('views',path.join(__dirname+'/src/public', 'views'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieparser());
app.use(sessions({
    secret:"this-is-your-secret",
    saveUninitialized: true,
    resave:false
}))
var session;
// 1) Count the number of times a user visits a webpage.Do this using session.

app.get('/', (req, res) => {
    session=req.session;
    if(session.visit===undefined){
        session.visit=1
        res.send("visited count = "+session.visit);
    }   
    else{
        session.visit=session.visit+1;
        res.send("visited count = "+session.visit);
    }    
})

// 2)using multer store the file by checking the type of the file.
// If the file type is image then upload the file in image folder otherwise upload it in files folder.
// your image file type should be only png.save all the files in mongodb

const multer=require('multer');
const MongoClient = require('mongodb').MongoClient;
const ObjId = require('mongodb').ObjectId;
const url="mongodb://0.0.0.0:27017/zybisys";
const client=new MongoClient(url);
client.connect().then(()=> console.log("connected"));
const db = client.db("zybisys");
var coll=db.collection("FileUpload");
const multerStorage=multer.diskStorage({
    destination:(req,file,cb)=>{
        console.log(file,path.extname(file.originalname))
        if(path.extname(file.originalname)==='.png'){
            cb(null,"images")
        }
        else if(path.extname(file.originalname)==='.jpg' || path.extname(file.originalname)==='.jpeg'){
            cb(new Error("jpg,jpeg not supported!!"), false);
        }
        else{  
            cb(null,"myfile")
        }
    },
    filename:(req,file,cb)=>{
        cb(null,`${file.originalname}`)
    }
});
const upload=multer({storage:multerStorage})
app.get("/file",(req,res)=>{
  res.render("multer")
})
app.post("/upload",upload.single("myfile"),(req,res)=>{
    // console.log(req.file)
    coll.insertOne(req.file)
    res.send("File uploaded")
});

app.listen(8080,()=>console.log('listening on'))