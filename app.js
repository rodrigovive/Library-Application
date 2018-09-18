const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;
const navs = [
  {
    title: 'Books',
    link: '/books',
  }, {
    title: 'Authors',
    link: '/author',
  },
];
const bookRouter = require('./src/routes/bookRoute')(navs);

app.use(express.static(path.join(__dirname, '/public/')));
app.use(morgan('tiny'));

app.use('/css',
  express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css')));
app.use('/js',
  express.static(path.join(__dirname, '/node_modules/bootstrap/dist/js')));
app.use('/js',
  express.static(path.join(__dirname, '/node_modules/jquery/dist')));
app.set('views', './src/views');
app.set('view engine', 'ejs');

app.use('/books', bookRouter);

app.get('/', (req, res) => {
  // res.sendFile(path.join(__dirname, '/views/', '/index.html'));
  res.render('index', {
    title: 'Application for library',
    navs,
  });
});

app.listen(port, () => {
  debug(`listening on node port ${chalk.green(port)}`);
});
