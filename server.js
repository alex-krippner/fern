const mongoose = require('mongoose');
const dotenv = require('dotenv');
//************************************************
// dotenv must be above must come before app dependency
dotenv.config({ path: './config.env' });

const app = require('./app.js');
//************************************************

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('DB connection successfull');
  });

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`app running on port ${port}`);
});
