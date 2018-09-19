const express = require('express');
// const debug = require('debug')('app:bookRouter');

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
      (async function query() {
        const request = new sql.Request();
        const result = await request.query('select * from books');
        // debug(result);
        res.render('bookListView', {
          navs,
          title: 'Books',
          books: result.recordset,
        });
      }());
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
