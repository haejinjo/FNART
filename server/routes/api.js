const express = require('express');
const reviewController = require('../controllers/reviewController');


/* 
 * Instantiating a router object from the Express library
 */
const router = express.Router();

router.get('/:id', reviewController.getReviews, (req, res) => {
  if (res.locals.noReviews) {
    console.log(`Successfully queries for user with id ${req.params.id} but no reviews for them found!`);
  }

  // Extract data from response modified by getReviews middleware
  const reviews = res.locals.reviews;

  // Sending a JSON object to the client
  // res.send(...{'Content-Type': 'text/json'}...)
  res.status(200).json({ reviews: reviews });
});

module.exports = router;