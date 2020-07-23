const express = require('express');
const reviewController = require('../controllers/reviewController');


/* 
 * Instantiating a router object from the Express library
 */
const router = express.Router();

router.get('/', /*reviewController.getReviews, */(req, res) => {

  // Extract data from response modified by getReviews middleware
  const data = res.locals.reviews;

  // Sending a JSON object to the client
  // res.send(...{'Content-Type': 'text/json'}...)
  res.status(200).json({ reviews: data });
});

module.exports = router;