import React, { Component } from 'react';

class ReviewCard extends Component {
  constructor(props) {
    super(props)

    this.state = {
      residents: null,
    }

    this.onDelete = this.onDelete.bind(this);
    this.onEdit = this.onEdit.bind(this);
  }

  componentDidMount() {

    // Get all residents as {username: x, _id: y} objects to display in dropdown
    fetch('/api/residents')
      .then(res => res.json())
      .then(data => {
        console.log('CreateReview: data fetched from /api/residents: ', data.residentsArray);
        // Once we get all residents in DB, save in CreateReview state
        this.setState({ residents: data.residentsArray });
      })
      .catch((e) => {
        console.log('ERROR FETCHING RESIDENTS IN CreateReview cDM');
        throw e;
      })
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

    if (this.state.residents) {
      return (<div className="reviewCard">
        <h4>Week {this.props.week} Assessment Review for {this.state.residents.filter(obj => obj._id === this.props.residentId)[0].username}</h4><br />
        <p>{this.props.body}</p><br />
        <div className="reviewCardButtons">
          <button>Edit Review</button>
          <button onClick={(e) => { this.onDelete(e) }}>Delete Review</button>
        </div>
      </div>);
    } else {
      return (<div>Please...wait....</div>);
    }
  }
}

export default ReviewCard;