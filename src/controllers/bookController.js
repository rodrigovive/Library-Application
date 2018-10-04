const debug = require('debug')('app:bookRouter');
const { MongoClient, ObjectID } = require('mongodb');


function bookController(bookService, navs) {
  function getIndex(req, res) {
    const url = 'mongodb://localhost:27017';
    const dbName = 'libraryApp';
    (async function mongo() {
      // debug(result);
      let client;
      try {
        client = await MongoClient.connect(url);
        debug('Connected correctly');
        const db = client.db(dbName);
        const collection = await db.collection('books');
        const books = await collection.find().toArray();
        // res.json(books);
        res.render('bookListView', {
          navs,
          title: 'Books',
          books,
        });
      } catch (e) {
        debug(e);
      }
      client.close();
    }());
  }

  function getById(req, res) {
    const url = 'mongodb://localhost:27017';
    const dbName = 'libraryApp';
    const { id } = req.params;
    (async function mongo() {
      // debug(result);
      let client;
      try {
        client = await MongoClient.connect(url);
        debug('Connected correctly');
        const db = client.db(dbName);
        const collection = await db.collection('books');
        const book = await collection.findOne({ _id: new ObjectID(id) });
        // res.json(books);
        book.details = await bookService.getBookById(book.bookId);
        res.render('bookView', {
          navs,
          title: 'Books',
          book,
        });
      } catch (e) {
        debug(e);
      }
      client.close();
    }());
  }

  function middleware(req, res, next) {
    if (req.user) {
      navs.push({
        title: 'Logout',
        link: '/auth/logout',
      });
      next();
    } else {
      res.redirect('/');
    }
  }

  return {
    getIndex,
    getById,
    middleware,
  };
}

module.exports = bookController;
