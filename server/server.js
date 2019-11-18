let express=require('express');
let app=express();
let mongo=require('mongodb').MongoClient;
let path=require('path');
let bodyparser=require('body-parser');
let mongoose = require('mongoose');
let dbo;

app.use(express.static(path.join(__dirname,'../dist/forms')));
app.use(bodyparser.json());


mongo.connect("mongodb://localhost:27017/noteDB", function (err, db) {
  if(err) console.log(`Error`);
  dbo = db.db('noteDB');

});


app.get('/get',(req,res)=>{
  dbo.collection('notes').find().toArray((err,records)=>{
    if (err) throw  err;
    res.send(records);
  })
});



app.post('/save',(req,res)=>{
  console.log([req.body],'receiving');
  let objid=mongoose.Types.ObjectId(req.body._id);
  delete req.body._id;
  dbo.collection('notes').deleteOne({_id : objid},(err,deleted)=> {
    dbo.collection('notes').insertMany([req.body], (err, data) => {
      if (err) throw err;
      dbo.collection('notes').find().toArray((err, records) => {
        if (err) throw  err;
        res.send(records);
      })
    })
  });
});

app.listen(5000,()=>{
  console.log("server started")
});

