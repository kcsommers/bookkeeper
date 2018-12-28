require('dotenv').config();
const express = require('express');
const bp = require('body-parser');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;
app.use(express.static(path.join(__dirname, 'static')));
app.use(bp.urlencoded({ extended: true }));
app.use(bp.json());
app.use('/users', require('./controllers/users').router);
// app.use('/books', require('./controllers/books').router);
app.use('/lists', require('./controllers/lists').router);
// app.use('/notes', require('./controllers/notes').router);
// app.use('/quotes', require('./controllers/quotes').router);
// app.use('/clubs', require('./controllers/clubs').router);
// app.use('/posts', require('./controllers/posts').router);

app.get('/', (req, res) => {
  res.send('WELL HEY THERE');
});
app.listen(port, () => { console.log(`Hooked on ${port}`); });