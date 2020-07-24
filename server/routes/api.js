const express = require('express');
const reviewController = require('../controllers/reviewController');
const residentController = require('../controllers/residentController');


/* 
 * Instantiating a router object from the Express library
 */
const router = express.Router();

router.get('/residents', residentController.getAllResidents, (req, res) => {
  console.log('got to last middleware in getting all/api/residents with ', res.locals.residents)
  return res.status(200).json({ residentsArray: res.locals.residents });
});

router.post('/addReview', reviewController.addReview, (req, res) => {
  console.log('got to last middleware in POSTing /api/addReview')
  return res.status(200).json({ status: 'niiiice' });
});

router.get('/:id', reviewController.getReviews, (req, res) => {
  console.log('querying for id for some reason')
  if (res.locals.noReviews) {
    console.log(`Successfully queries for user with id ${req.params.id} but no reviews for them found!`);
  }

  // Extract data from response modified by getReviews middleware
  const reviews = res.locals.reviews;

  // Sending a JSON object to the client
  // res.send(...{'Content-Type': 'text/json'}...)
  return res.status(200).json({ reviews: reviews });
});


module.exports = router;