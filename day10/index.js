// ____TODOLIST____


const express= require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const MongoClient = require('mongodb').MongoClient;
const url="mongodb://0.0.0.0:27017/zybisys";
const client=new MongoClient(url);
const ObjId = require('mongodb').ObjectId;
client.connect().then(()=> console.log("connected"));

app.set('view engine','ejs');

app.set('views',path.join(__dirname+'/src/public', 'view'))

const db = client.db("zybisys");
var coll=db.collection("TodoData");
app.post('/', (req,res)=>{
    const Tasks={Data:req.body.Data}
    coll.insertOne(Tasks).then(()=>{
        res.redirect('/')    
    }).catch((err)=>console.log(err))
})
app.get('/', (req,res)=>{
    coll.find({}).toArray().then((data)=>{
        res.render('Todo',{data:data});
    }).catch((err)=>{
        console.log(err)
    })
});
app.get('/delete/:id', (req,res)=>{
    coll.deleteOne({_id:new ObjId(req.params.id)})
    .then(()=>{
        res.redirect('/')
    })
    .catch((err)=>console.log(err))
});

app.get('/edit/:id/:Data', (req,res)=>{
    res.render('edit',{Data:req.params.Data,id:req.params.id})
})
app.post('/edit',(req,res)=>{
    coll.updateOne({_id:new ObjId(req.body.id)},{$set:{Data:req.body.data}}).then(()=>{
        res.redirect('/')
    })
    .catch((err)=>console.log(err))
})
app.listen(8080, function(){
    console.log("listening");
})
