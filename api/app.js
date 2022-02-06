const express = require("express"); // modulo traido de Express
const morgan = require("morgan"); // Modulo traido de Morgan
const tweetBank = require('./tweetBank'); // importa toda lo exportado por TweetBank.js
const app = express();

app.use(morgan("tiny"));
app.use(express.json())

app.listen(8080, () => {
  console.log("Servidor corriendo en el puerto 8080");
});

app.get('/api/tweets/', (req, res) => {
  const tweets = tweetBank.list();
  res.send(tweets);
});

app.get('/api/users/:name', (req, res) => {
  const { name } =  req.params
  const match = tweetBank.findAllMatch(name)
  console.log(req.params);
  res.send(match);
});

app.get('/api/tweets/:id', (req,res) => {
res.send(tweetBank.findOne(parseInt(req.params.id)))
});

app.delete('/api/tweets/:id', (req, res)=>{
  res.send(tweetBank.remove(parseInt(req.params.id)))
});

app.post('/api/tweets', (req, res) => {
  const { name, content, imgURL } = req.body
  // const name = req.body.name;
  // const content = req.body.content;
  // const imgURL = req.body.imgURL;
  const tweet = tweetBank.add(name, content, imgURL);
  res.status(201).send(tweet);
});

app.put("/:id", (req, res) => {
  const id = number(req.params.id);
  const content = req.body.content;
  tweetBank.update(id, content);
  res.sendStatus(200);
});