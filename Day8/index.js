const express=require('express');
let app = express();

app.set('view engine', 'ejs');
app.set('views',__dirname)
console.log(__dirname)
app.get('/', function(req, res){
    var Arr=[{"Name":"Yogashree","Salary":13000},{"Name":"Pavithra","Salary":13500},{"Name":"Lokeshwari","Salary":14000},{"Name":"Ganesh","Salary":45000},{"Name":"Deepak","Salary":18000}]
    var numArr=[1,2,3,4,5,6,7,8,9,10,11]
    var Date='2023-07-22'
    res.render('task',{ArrObj:Arr,Add:numArr,D:Date})
})
app.listen(8000,()=>{
    console.log('listening on');
})
