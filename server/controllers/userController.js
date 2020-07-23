const db = require('../models/models');

const userController = {};

userController.verifyUser = (req, res, next) => {
  // Post request made from App component
  // expect sensitive info via POST body
  const user = req.body.username;
  const pw = req.body.password;
  // console.log(`req.body: ${JSON.stringify(req.body)}\n\n\n`);

  // TODO make table fellows/residents dynamic!
  let verifyQuery = `SELECT * FROM fellows
                    WHERE username = $1 AND password = $2;`
  // console.log(`user: ${user}, pw: ${pw}\n\n\n`);
  db.query(verifyQuery, [user, pw])
    .then((data) => {
      const fellow = data.rows[0];

      // If no user found, note that
      if (!data.rows.length) {
        console.log('no user found');
        res.locals.newUser = true;
        return next();
      }
      res.locals.fellow_id = fellow._id;
      res.locals.username = fellow.username;
      console.log('welcome back?');
      // Regardless, go to next middleware!
      return next()
    })
    .catch((e) => {
      console.log('Error verifying user in userController!');
      return next(e);
    });
}

userController.createUser = (req, res, next) => {
  // Post request made from App component
  // expect sensitive info via POST body
  const user = req.body.username;
  const pw = req.body.password;

  // TODO make table fellows/residents dynamic!
  let insertQuery = `INSERT INTO fellows (username, password)
                     VALUES($1, $2);`

  db.query(insertQuery, [user, pw])
    .then((data) => {
      // If failure to insert
      if (!data.rows.length) {
        res.locals.newUser = true;
      }
      // Regardless, go to next middleware!
      return next();
    })
    .catch((e) => {
      console.log('Error creating new user in userController!');
      return next(e);
    });
}

module.exports = userController;