const express = require('express');

const bookRouter = express.Router();


function router(navs) {
  const books = [
    {
      title: 'Algorithm',
      author: 'Viveros',
    },
  ];
  bookRouter.route('/')
    .get((req, res) => {
      res.render('bookListView', {
        navs,
        title: 'Books',
        books,
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
}


module.exports = router;
