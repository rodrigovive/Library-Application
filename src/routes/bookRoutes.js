const express = require('express');
// const debug = require('debug')('app:bookRouter');
// const { MongoClient, ObjectID } = require('mongodb');
const bookController = require('../controllers/bookController');

const bookRouter = express.Router();

function router(navs) {
  // const books = [
  //   {
  //     title: 'Algorithm',
  //     author: 'Viveros',
  //   },
  // ];
  const { getIndex, getById, middleware } = bookController(navs);
  bookRouter.use(middleware);
  bookRouter.route('/')
    .get(getIndex);
  bookRouter.route('/:id')
    // .all((req, res, next) => {
    //   (async function query() {
    //
    //   }());
    // })
    .get(getById);
  return bookRouter;
}


module.exports = router;
