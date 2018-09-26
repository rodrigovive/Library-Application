const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');
const path = require('path');
const sql = require('mssql');
const bodyParser = require('body-parser');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const app = express();
const port = process.env.PORT || 3000;

const config = {
  user: 'viveros',
  password: 'Cordova2',
  server: 'pslibraryviveros.database.windows.net',
  database: 'PSLibrary',
  options: {
    encrypt: true,
  },
};

sql.connect(config).catch((err) => {
  debug(err);
});
const navs = [
  {
    title: 'Books',
    link: '/books',
  }, {
    title: 'Authors',
    link: '/author',
  },
];
// const bookRouter = require('./src/routes/bookRoutes')(navs);
// const adminRouter = require('./src/routes/adminRoutes')(navs);
const authRouter = require('./src/routes/authRoutes')(navs);

app.use(express.static(path.join(__dirname, '/public/')));
app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({ secret: 'library' }));
require('./src/config/passport')(app);

app.use('/css',
  express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css')));
app.use('/js',
  express.static(path.join(__dirname, '/node_modules/bootstrap/dist/js')));
app.use('/js',
  express.static(path.join(__dirname, '/node_modules/jquery/dist')));
app.set('views', './src/views');
app.set('view engine', 'ejs');

// app.use('/books', bookRouter);
// app.use('/admin', adminRouter);
app.use('/auth', authRouter);
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
