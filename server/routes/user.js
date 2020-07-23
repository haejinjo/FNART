const express = require('express');
const userController = require('../controllers/userController');


/* 
 * Instantiating a router object from the Express library
 */
const router = express.Router();

router.post('/login', userController.verifyUser, (req, res) => {
  if (res.locals.error || res.locals.newUser) {
    res.status(400).json({ loggedIn: false });
    return;
  }
  // console.log(res.locals.fellow_id);
  // console.log(res.locals.username);
  res.status(200).json({ 'username': res.locals.username, 'fellow_id': res.locals.fellow_id, 'loggedIn': true });
});

router.post('/signup', userController.createUser, (req, res) => {
  if (res.locals.error) {
    console.log('There was an error creating you as a new user. Check your inputs!');
    res.status(400).json({ signedUp: false });
  }
  res.status(200).redirect('/');
});

module.exports = router;