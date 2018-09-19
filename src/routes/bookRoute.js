const express = require('express');
const debug = require('debug')('app:bookRouter');

const bookRouter = express.Router();
const sql = require('mssql');

function router(navs) {
  const books = [
    {
      title: 'Algorithm',
      author: 'Viveros',
    },
  ];
  bookRouter.route('/')
    .get((req, res) => {
      const request = new sql.Request();
      request.query('select * from books')
        .then((result) => {
          debug(result);
          res.render('bookListView', {
            navs,
            title: 'Books',
            books: result.recordset,
          });
        });
    });
  bookRouter.route('/:id')
    .get((req, res) => {
      const { id } = req.params;
      res.render('bookView', {
        navs,
        title: 'Books',
        book: books[id],
      });
    });
  return bookRouter;
}


module.exports = router;
