const express = require('express');
const { MongoClient } = require('mongodb');
const debug = require('debug')('app:adminRoute');

const adminRouter = express.Router();
const books = [
  {
    title: 'Terror',
    author: 'Viveros',
    genre: 'horror',
    read: false,
  },
];
function router(nav) {
  adminRouter.route('/')
    .get((req, res) => {
      const url = 'mongodb://localhost:27017';
      const dbName = 'libraryApp';
      (async function mongo() {
        let client;
        try {
          client = await MongoClient.connect(url);
          debug('Connected correctly to server');
          const db = client.db(dbName);
          const response = await db.collection('books').insertMany(books);
          res.json(response);
        } catch (e) {
          debug(e.stack);
        }
        client.close();
      }());

      // res.send('Inserting books');
    });

  return adminRouter;
}

module.exports = router;
