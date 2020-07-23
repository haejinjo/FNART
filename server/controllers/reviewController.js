const db = require('../models/models');

const reviewController = {};

reviewController.getReviews = (req, res, next) => {
  const fellow_id = req.params.id;
  // Receive id of fellow or resident in request
  // If id doesn't exist in Fellows or Residents tables
  // Redirect to signup
  // Else
  // Query to select all reviews associated with this individual
  const selectQuery = `SELECT * FROM reviews
                       WHERE fellow_id=$1;`;

  db.query(selectQuery, [fellow_id])
    .then((data) => {
      if (!data.rows.length) {
        res.locals.noReviews = true;
        console.log(`This fellow (id ${fellow_id}) has not reviewed any resident assessments yet!`);
        return next();
      }
      // should be able to extract the following info:
      // id of fellow who created this review
      // id of student this review was meant for
      // week this review is relevant to
      // body of the text review
      // Date this review was created
      // Date this review was last edited

      res.locals.data = data;
      return next();
    })
    .catch((e) => {
      return next(e);
    });
};


/*
 * 
 * FOLLOWING FUNCTIONALITY IS ONLY FOR FELLOWS
 *
 */


reviewController.addReview = (req, res, next) => {
  // Receive reviewer id, reviewee id, and body text in POST request
  // If reviewee id doesn't exist in Residents table
  // throw error: this student does not exist
  // Else
  // INSERT the current week, review body text, fellow/resident IDs, and current timestamp
  const reviewObj = req.body;
  const insertQuery = `INSERT INTO reviews (week, body, fellow_id, resident_id)
                      VALUES()`;

  db.query(insertQuery, [])
    .then((data) => {
      next();
    })
    .catch((e) => {
      next(e);
    });
};

reviewController.editReview = (req, res, next) => {
  // TODO: Check for any changes reviewer id, reviewee id, and body text in POST request BEFORE updating
  const { fellow_id, resident_id, review_id, week, body } = req.body;
  // Check for resident/reviewee existence
  db.query('SELECT * FROM residents WHERE resident_id = $1', [resident_id])
    .then((residentData) => {
      // If reviewee id doesn't exist in Residents table
      if (!residentData.rows.length) {
        // throw error: this resident does not exist
        console.log(`ERROR: resident with ID ${resident_id} does not exist!`);
        res.locals.residentUnknown = true;
        return next();
      }

      // Else: Check for fellow/reviewer existence
      db.query('SELECT * FROM fellows WHERE fellow_id = $1', [fellow_id])
        .then((fellowData) => {
          // If reviewer id doesn't exist in Residents table
          if (!fellowData.rows.length) {
            // throw error: this fellow does not exist
            console.log(`ERROR: fellow with ID ${resident_id} does not exist!`);
            res.locals.fellowUnknown = true;
            return next();
          }
          // Else: UPDATE the current week, review body text, fellow/resident IDs, and current timestamp
          const updateQuery = `UPDATE reviews
                               SET (week, body) = ($2, $3)
                               WHERE _id = $1`;
          db.query(updateQuery, [review_id, week, body])
            .then((updatedRows) => {
              if (!updatedRows.rows.length) {
                console.log(`ERROR: review with ID ${review_id} failed to update! Probably does not exist!`);
              }
              return next();
            })
            .catch((e) => {
              console.log(`reviewController.editReview: error! attempt to update review with id ${review_id} failed`);
              return next(e);
            }); // end update query
        })
        .catch((e) => {
          console.log(`reviewController.editReview: error! attempt to check for fellow with id ${fellow_id} failed`);
          return next(e);
        }); // end fellow query check
    })
    .catch((e) => {
      console.log(`reviewController.editReview: error! attempt to check for resident with id ${resident_id} failed`);
      return next(e);
    }); // end resident query check

};

reviewController.deleteReview = (req, res, next) => {
  // Check for any changes reviewer id, reviewee id, week in DELETE request
  const { fellow_id, resident_id, week } = req.body;

  // If reviewee id doesn't exist in Residents table
  // throw error: this student does not exist
  // Else
  // UPDATE the current week, review body text, fellow/resident IDs, and current timestamp
  const deleteQuery = `DELETE FROM reviews 
                       WHERE fellow_id = $1 AND resident_id = $2 AND week = $3`;

  db.query(deleteQuery, [fellow_id, resident_id, week])
    .then((data) => {
      next();
    })
    .catch((e) => {
      next(e);
    });
};

/*
 CREATE TABLE Reviews (
  "_id" SERIAL PRIMARY KEY,
  "week" integer NOT NULL,
  "body" varchar NOT NULL,
  "fellow_id" integer NOT NULL,
  "resident_id" integer NOT NULL,
  "created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
  "updated_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY ("fellow_id")
    REFERENCES "fellows"("_id"),
  FOREIGN KEY ("resident_id")
    REFERENCES "residents"("_id")
 );

 CREATE TABLE Fellows (
  "_id" SERIAL PRIMARY KEY,
  "username" varchar NOT NULL,
  "password" varchar NOT NULL
 );

 CREATE TABLE Residents (
  "_id" SERIAL PRIMARY KEY,
  "username" varchar NOT NULL,
  "password" varchar NOT NULL
 );

 */