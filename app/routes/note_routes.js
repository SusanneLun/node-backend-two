





module.exports = function(app, client) {
  const collection =
  app.post('/notes', (req, res) => {
    const note = { text: req.body.body, title: req.body.title };
    const db = client.db("firstie")
    db.collection('Cluster0').insertMany(note, (err, result) => {
      if (err) {
        res.send({ 'error': 'An error has occurred' });
      } else {
        res.send(result.ops[0]);
      }
    });
  });
};
