// ___________________________validation for name and age________________________________________________________________
// name and age should not be null ,name should contain only letters and age should contain only numbers

const express = require('express');
let app= express();
const bodyParser=require('body-parser');
app.use(bodyParser.json());
app.post('/index', function(req, res){
    let name=req.body.name.trim();
    let age=(req.body.age+"").trim();
    if(name!=='' && age!==''){
        for(let val of name){
            if(val.toUpperCase()!==val.toLowerCase())
                continue;
            res.status(400).send("Don't include numbers in name")
        }
        for(let val of age){
            if(val.toUpperCase()===val.toLowerCase())
                continue;
            res.status(400).send("Don't include alphabet in age")
        }
        res.status(200).send("valid")       
    }
    res.status(400).send('Invalid')     
})
app.listen(8080,function(){
    console.log('listening on');
})