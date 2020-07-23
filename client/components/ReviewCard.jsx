import React, { Component } from 'react';

class ReviewCard extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (<div className="reviewCard">
      <h4>Week {this.props.week} Assessment: Review #{this.props.id}</h4><br />
      <h4>Resident {this.props.residentId}</h4><br />
      <p>{this.props.body}</p><br />
      <div className="reviewCardButtons">
        <button>Edit Review</button>
        <button>Delete Review</button>
      </div>
    </div>);
  }
}

export default ReviewCard;