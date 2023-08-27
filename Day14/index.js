// 1)create an api to fetch a single document by id
var express = require('express');
const app= express();
const path = require('path');
const mongoose=require('mongoose');
const bodyparser=require('body-parser');
const routes=require('./src/routes/app');
const multer=require('multer');
var fs = require("fs");
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({ extended:true}));
const MongoClient = require('mongodb').MongoClient;
const Client = new MongoClient("mongodb://0.0.0.0:27017/mydb")
const DB=Client.db("mydb");
const coll=DB.collection("files")
mongoose.connect('mongodb://0.0.0.0:27017/mydb',{
    useNewUrlParser:true,
    useUnifiedTopology:true
})

const db=mongoose.connection;
db.once('open',function(){
    console.log('mongoose connection')
})
app.use('/',routes)
// 2)upload a file using postman in the database.
// validate it by checking the size of the fileand the extension.
// Size should not be more than 1 mb and extension should be only pdf.

const multerStorage=multer.diskStorage({
    
    destination:(req,file,cb)=>{
        if(path.extname(file.originalname)==='.pdf'){
                cb(null,"myfile")
        }
        
    },
    filename:(req,file,cb)=>{
        cb(null,`${file.originalname}`)
    }
});
var upload = multer({ storage :multerStorage,limits: { fileSize: 1000*1024 }}).single("myfile");

app.post('/upload',function(req,res){
    upload(req,res,function(err) {
        if(err) {
            return res.end("Error uploading file.");
        }
        coll.insertOne({files:req.file}).then(()=>{
            console.log("inserted successfully")
            res.send("file uploaded")
        })
    });});
    
app.listen(8000,()=>console.log('listening on'));