



var ObjectID = require('mongodb').ObjectID;

module.exports = function(app, client) {
  app.get('/notes/:id', (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
    const db = client.db('star-wars')
    db.collection('characters').findOne(details, (err, item) => {
      if (err) {
        res.send({'error':'An error has occurred'});
      } else {
        res.send(item);
      }
    });
  });

  app.delete('/notes/:id', (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
    const db = client.db('star-wars')
    db.collection('characters').deleteOne(details, (err, item) => {
      if (err) {
        res.send({'error':'An error has occurred'});
      } else {
        res.send('Name ' + id + ' deleted!');
      }
    });
  });

  app.put('/notes/:id', (req, res) => {
  const id = req.params.id;
  const details = { '_id': new ObjectID(id) };
  const documents = [{ $set: { name: req.body.name, age: req.body.age } }];
  const db = client.db('star-wars')
  db.collection('characters').updateOne(details, documents, (err, result) => {
    if (err) {
        res.send({'error':'An error has occurred'});
    } else {
        res.send(documents);
    }
  });
});

  app.post('/notes', (req, res) => {
    const documents = [{ name: req.body.name, age: req.body.age }];
    const db = client.db('star-wars')
    db.collection('characters').insertMany(documents, (err, result) => {
      if (err) {
        res.send({ 'error': 'An error has occurred in this case' });
      } else {
        res.send(result.ops[0]);
      }
    });
  });
};
