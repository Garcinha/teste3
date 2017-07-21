const express = require('express');
const bodyParser= require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
const app = express();

var db;

app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');

app.listen(3000, function() {
  console.log('listening on 3000');
});

//conecta o mongo com a aplicação
MongoClient.connect('mongodb://localhost:27017/quote', (err, database) => {
   if (err) return console.log(err);
   db = database;
});

app.get('/', (req, res) => {
  db.collection('quotes').find().toArray(function(err, result) {
     if (err) return console.log(err);
     res.render('index.ejs', {quotes: result});
   });
});

app.get('/delete/:id', (req, res)=>{
  const id = req.params.id;
  console.log(id);
  try {
    db.collection('quotes').deleteOne({_id : ObjectId(id)})
  } catch(e){console.log(e);}

  res.redirect('/');
});

app.post('/quotes', (req, res) => {
  db.collection('quotes').save(req.body, (err, result) => {
    if (err) {
	    return console.log(err);
    }
    res.redirect('/');
  });
});