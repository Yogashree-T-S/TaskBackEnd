// create a login and logout app using express-session 
// create user in the database with email and password.
// Where the password should be hashed using bcrypt and the login root should check if the user exists in the database or not.
// if the user is exist create their session in the database and give three minutes of expiration time .
// if the user is inactivate for three minutes then automatically log out the user by showing the login page again.

const express = require('express');
const app = express();
const path = require('path');
const bodyparser = require('body-parser');
const sessions = require('express-session');
const MongoClient = require('mongodb').MongoClient;
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}));
const client = new MongoClient("mongodb://0.0.0.0:27017/zybisys");
const DB=client.db("zybisys")
const coll1=DB.collection("storage")
const coll2=DB.collection("sessionAuthontication")

app.set('view engine', 'ejs');
app.set('views',path.join(__dirname+'/src/public', 'views'));
app.use(sessions({
    secret:"this-is-your-secret",
    saveUninitialized:false,
    cookie:{maxAge: 3*60000},
    resave:false
}))
var session;
app.get('/', function (req, res) {
    session=req.session;
    if(session.Data){
        res.send(`link to logOut <a href='/logout'>LogOut</a>`)
    }
    else{
        coll2.deleteOne(session.Data,{new:true}).then((val)=>{
            console.log("deleted")
        })
        res.render('login')
    }
    
})
app.post('/login', function (req, res) {
    coll1.find({email:req.body.email,password:req.body.password}).toArray().then((data)=>{
        if(data.length){
            session=req.session
            session.Data=data
            console.log(session)
            coll2.insertOne(session.Data[0]);
            res.send("you are logged in successfully")
        }else{
            res.send("Incorrect email or password")
        }
    });
    
});
app.get('/logout',(req,res)=>{
    req.session.destroy()
    res.redirect('/')
})
app.listen(8080,(req,res)=>console.log('listening on'))