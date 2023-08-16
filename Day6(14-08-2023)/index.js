const express = require('express')
let app = express();
const MongoClient = require('mongodb').MongoClient;
const url="mongodb://0.0.0.0:27017/zybisys"
const client=new MongoClient(url);
const bodyparser=require('body-parser')

const fs=require('fs');
const path = require('path');

//_________________________1________________________
// Create different routes in express to perform crud operation


app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}));
const DB=client.db("zybisys")
const coll=DB.collection("students")
app.post('/dataBase/1',(req,res)=>{
    // obj.push(req.body);
    res.send("Writing");
    client.connect(url).then(()=>{
        console.log('1')
        coll.insertMany(req.body).then(()=>{
            console.log('Inserted')
        });
    
    })
})
app.post('/dataBase/2',(req,res)=>{
    res.send("Reading");
    client.connect(url).then(()=>{
        console.log("2")
        coll.find(req.body).toArray().then((res)=>{console.log(res)});
    })
})

app.post('/dataBase/3',(req,res)=>{
    console.log("3")
    res.send("updated")
    coll.updateMany(req.body[0],{$set:req.body[1]}).then(()=>{
        console.log("updated")
    });
})

app.post('/dataBase/4',(req,res)=>{
    console.log("4")
    res.send("Deleted")
    coll.deleteMany(req.body).toArray().then(()=>{
        console.log("Deleted")
    });
})



//_________________________2________________________
// Fetch the data from a collections and write it to a textfile.

coll.find({}).toArray().then((res)=>{
    console.log("Success")
    fs.writeFile('DatabaseCollection.txt',JSON.stringify(res),(err,res)=>{
        if(err){
            console.log(err);
        }
        else{
            console.log("written ");
        }
    })

});
    
app.listen('8080',()=>console.log('listening on'))

// _____________________________________________________________________________________________________________________________________________________________

// 3. write a MongoDB query to find the higesht score for restaurants
//3.db.hotel.aggregate([{$group:{_id:"$name",max:{$max:{$max:"$grades.score"}}}}])

// ********************************************************************************************************************************************************************************

// 4.write a MongoDB query to find the lowest score for each restaurants
//4.db.hotel.aggregate([{$group:{_id:"$name",min:{$min:{min:{$min:"$grades.score"}}}}}])

// ********************************************************************************************************************************************************************************

// 5.write a MongoDB query to find the count of restaurants in each borough.
//5.db.hotel.aggregate({$group:{_id:"$borough",sum:{$sum:1}}})

// ********************************************************************************************************************************************************************************

// 6.write a MongoDB query to find the count of restaurants that receive grade of A for each cuisine.
//6.db.hotel.aggregate({$match:{"grades.grade":"A"}},{$group:{_id:"$cuisine",sum:{$sum:1}}})

// ____________________________________________________________________________________________________________________________________________________________________________________