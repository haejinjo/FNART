import React, { Component } from 'react';

class ReviewCard extends Component {
  constructor(props) {
    super(props)

    this.onDelete = this.onDelete.bind(this);
    this.onEdit = this.onEdit.bind(this);
  }

  onDelete(e) {

    /*
     * Setup data object to POST to backend
     */
    const review_id = this.props.id;
    const reviewToDelete = {
      review_id,
    }

    /*
     * Send data to create new review in backend
     */
    fetch('/api/deleteReview', {
      method: 'DELETE',
      body: JSON.stringify(reviewToDelete),
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
    })
      .then(res => res.json())
      .then((data) => {
        console.log('Got JSON response back from DELETE: ', data);
        // Set parent state to rerender ReviewContainer rather than CreateReview component
        // Go "back" to view reviews
        this.props.deleteHandler();
      })
      .catch((e) => {
        console.log('/api/deleteReview: ERROR: ', e);
      });
  }

  onEdit() {
    return;
  }

  render() {
    return (<div className="reviewCard">
      <h4>Week {this.props.week} Assessment: Review #{this.props.id}</h4><br />
      <h4>Resident {this.props.residentId}</h4><br />
      <p>{this.props.body}</p><br />
      <div className="reviewCardButtons">
        <button>Edit Review</button>
        <button onClick={(e) => { this.onDelete(e) }}>Delete Review</button>
      </div>
    </div>);
  }
}

export default ReviewCard;