const dotenv = require('dotenv');
const app = require('./app.js');

dotenv.config({ path: './config.env' });

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`app running on port ${port}`);
});
