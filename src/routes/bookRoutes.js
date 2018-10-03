const express = require('express');
const debug = require('debug')('app:bookRouter');
const { MongoClient, ObjectID } = require('mongodb');

const bookRouter = express.Router();

function router(navs) {
  // const books = [
  //   {
  //     title: 'Algorithm',
  //     author: 'Viveros',
  //   },
  // ];
  bookRouter.use((req, res, next) => {
    if (req.user) {
      navs.push({
        title: 'Logout',
        link: '/auth/logout',
      });
      next();
    } else {
      res.redirect('/');
    }
  });
  bookRouter.route('/')
    .get((req, res) => {
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
    });
  bookRouter.route('/:id')
    // .all((req, res, next) => {
    //   (async function query() {
    //
    //   }());
    // })
    .get((req, res) => {
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
    });
  return bookRouter;
}


module.exports = router;
