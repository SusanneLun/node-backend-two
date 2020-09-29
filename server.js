

const express        = require('express');
const MongoClient    = require('mongodb').MongoClient;
const bodyParser     = require('body-parser');
const db             = require('./config/db');


const app            = express();

const port = 8000;



app.use(bodyParser.urlencoded({ extended: true }));

//
MongoClient.connect(db.url, { useUnifiedTopology: true }, (err, client) => {
  if (err) return console.log(err)


  // Make sure you add the database name and not the collection name
  // const database = client.db('star-wars');
  // const database = database.db("notes")
  require('./app/routes')(app, client);
  app.listen(port, () => {
    console.log('We are live on ' + port);
  });
})
//
//
// MongoClient.connect(db.url, (err, database) => {
//   if (err) return console.log(err)
//
//   // Make sure you add the database name and not the collection name
//   const database = database.db("note-api")
//   require('./app/routes')(app, database);
//   app.listen(port, () => {
//     console.log('We are live on ' + port);
//   });
// })
//
// MongoClient.connect(db.url, { useNewUrlParser: true, useUnifiedTopology: true }).then(client => {
//   const db = client.db('star-wars');
//   const collection =
//   app.post('/notes', (req, res) => {
//   const documents = { name: req.body.name, age: req.body.age};
//   return collection.insertOne(documents);
// })
// })
