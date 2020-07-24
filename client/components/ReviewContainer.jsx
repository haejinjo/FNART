import React, { Component } from 'react';
import ReviewCard from './ReviewCard';
import CreateReview from './CreateReview';

class ReviewContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      reviews: null,
      fetchedReviews: false,
      creatingReview: false,
    }

    this.createMode = this.createMode.bind(this);
    this.viewMode = this.viewMode.bind(this);
  }

  componentDidMount() {
    fetch(`/api/${this.props.id}`)
      .then((res => res.json()))
      .then((data) => {
        console.log('ReviewContainer: data fetched from /api: ', data);
        // Store array of review objects from DB into component state
        this.setState({ reviews: data.reviews });
        // Store author of all the gotten reviews
        this.setState({ fellow_id: data.reviews[0].fellow_id });
        // Notify Component that we've successfully gotten all the reviews it has to render
        this.setState({ fetchedReviews: true });
      })
      .catch((e) => {
        console.log('fetch /api: ERROR: ', e);
      });
  }

  createMode() {
    this.setState({ fetchedReviews: false })
    this.setState({ creatingReview: true });
  }

  viewMode() {
    fetch(`/api/${this.props.id}`)
      .then((res => res.json()))
      .then((data) => {
        console.log('ReviewContainer: data fetched from /api: ', data);
        // Store array of review objects from DB into component state
        this.setState({ reviews: data.reviews });
        // Notify Component that we've successfully gotten all the reviews it has to render
        this.setState({ fetchedReviews: true });
        this.setState({ creatingReview: false });
      })
      .catch((e) => {
        console.log('fetch /api: ERROR: ', e);
      });
  }

  render() {

    // Show CreateReview if user has clicked the Create Review Button
    // reset state before returning
    if (this.state.creatingReview) {
      return (<CreateReview fellow_id={this.state.fellow_id} submitHandler={this.viewMode} />);
    }
    else {
      // Have reviews been given to us yet?
      if (this.state.fetchedReviews) {
        // Display reviews in the form of ReviewCard components!
        const reviewObjects = this.state.reviews;
        const reviewCards = [];
        let currentReview = null;
        for (let i = 0; i < reviewObjects.length; i += 1) {
          currentReview = reviewObjects[i];
          reviewCards.push(<ReviewCard key={'reviewCardKey' + i} id={currentReview._id} week={currentReview.week} residentId={currentReview.resident_id} body={currentReview.body} />);
        }
        return (
          <div className='reviewContainer'>
            {reviewCards}
            <button className='createReviewButton' onClick={this.createMode}>+</button>
          </div>
        );
      }
      // If not, tell user to be patient
      else {
        return (<div>Fetching reviews, please hold *click*......</div>);
      }
    }
  }
}

export default ReviewContainer;