const express = require('express');

const app = express();

app.use(express.static(`${__dirname}/dist/dewalt-form`));

app.get('/', (req, res) => {
  console.log('??');
  res.sendFile('/dist/dewalt-form/index.html', { root: __dirname });
});
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(__dirname);
  console.log(`Listening Port ${port}`);
});
