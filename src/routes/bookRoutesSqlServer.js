const express = require('express');
// const debug = require('debug')('app:bookRouter');

const bookRouter = express.Router();
const sql = require('mssql');

function router(navs) {
  // const books = [
  //   {
  //     title: 'Algorithm',
  //     author: 'Viveros',
  //   },
  // ];
  bookRouter.route('/')
    .get((req, res) => {
      (async function query() {
        const request = new sql.Request();
        const { recordset } = await request.query('select * from books');
        // debug(result);
        res.render('bookListView', {
          navs,
          title: 'Books',
          books: recordset,
        });
      }());
    });
  bookRouter.route('/:id')
    .all((req, res, next) => {
      (async function query() {
        const { id } = req.params;
        const request = new sql.Request();
        const { recordset } = await request.input('id', sql.Int, id)
          .query('select * from books where id = @id');
        // debug(recordset);
        [req.book] = recordset;
        next();
      }());
    })
    .get((req, res) => {
      res.render('bookView', {
        navs,
        title: 'Books',
        book: req.book,
      });
    });
  return bookRouter;
}


module.exports = router;
