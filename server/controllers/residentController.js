const db = require('../models/models');

const residentController = {};

residentController.getAllResidents = (req, res, next) => {
  // Get all names and corresponding resident_id's from residents table
  const selectQuery = `SELECT _id, username FROM residents;`;
  console.log('getting all residents with ', selectQuery)
  db.query(selectQuery)
    .then((residents) => {
      if (!residents.rows) {
        console.log('No residents registered in Codesmith yet!');
        return next();
      }
      res.locals.residents = residents.rows;
      return next();
    })
    .catch((e) => {
      console.log('Error getting all residents from DB');
      return next(e);
    });
}

module.exports = residentController;