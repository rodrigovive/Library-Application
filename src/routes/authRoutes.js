const express = require('express');
const { MongoClient } = require('mongodb');
const debug = require('debug')('app:authRoutes');
const passport = require('passport');

const authRouter = express.Router();

function router(navs) {
  authRouter.route('/signUp')
    .post((req, res) => {
      const { username, password } = req.body;
      const url = 'mongodb://localhost:27017';
      const dbName = 'libraryApp';
      (async function addUser() {
        let client;
        try {
          client = await MongoClient.connect(url);
          debug('Connected correctly');
          const db = client.db(dbName);
          const col = db.collection('users');
          const user = { username, password };
          const results = await col.insertOne(user);
          req.login(results.ops[0], () => {
            res.redirect('/books');
          });
        } catch (e) {
          debug(e);
        }
        client.close();
      }());
      // Create user

      // debug(req.body);
      // res.json(req.body);
    });
  authRouter.route('/profile')
    .all((req, res, next) => {
      if (req.user) {
        navs.push({
          title: 'Logout',
          link: '/auth/logout',
        });
        next();
      } else {
        res.redirect('/');
      }
    })
    .get((req, res) => {
      res.json(req.user);
    });

  authRouter.route('/signin')
    .get((req, res) => {
      res.render('signin', {
        navs,
        title: 'Sign In',
      });
    })
    .post(passport.authenticate('local', {
      successRedirect: '/books',
      failureRedirect: '/',
    }));

  authRouter.route('/logout')
    .get((req, res) => {
      req.logout();
      res.redirect('/');
    });

  return authRouter;
}

module.exports = router;
