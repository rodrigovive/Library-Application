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
            res.redirect('/auth/profile');
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
      successRedirect: '/auth/profile',
      failureRedirect: '/',
    }));
  return authRouter;
}

module.exports = router;
