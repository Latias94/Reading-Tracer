const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const books = require('./routes/api/books');

const app = express();

app.use(bodyParser.urlencoded({
  extended: false,
}));
app.use(bodyParser.json());

// MongoDB
const mongooseConfig = {
  useNewUrlParser: true,
};

const db = require('./config/keys').mongoURI;

mongoose
  .connect(db, mongooseConfig)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// cross origin
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use('/api/books', books);

const port = require('./config/keys').port;

app.listen(port,
  () => console.log(`Server running on port ${port}`));