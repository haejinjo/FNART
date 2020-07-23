import React, { Component } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import { DropdownButton } from 'react-bootstrap';

class CreateReview extends Component {
  constructor(props) {
    super(props)

    this.state = {
      chosenWeek: null,
      chosenResidentId: null,
      dropdownOptions: [
        {
          type: 'group', name: 'Week 1', items: [
            { value: 'Haejin Jo', label: 'Haejin Jo' },
            { value: 'Serena Kuo', label: 'Serena Kuo' },
            { value: 'Justin Choo', label: 'Justin Choo' }
          ]
        },
        {
          type: 'group', name: 'Week 2', items: [
            { value: 'Sey Kim', label: 'Sey Kim' },
            { value: 'Lucy Chi', label: 'Lucy Chi' },
            { value: 'Anthony Lin', label: 'Anthony Lin' }
          ]
        },
        {
          type: 'group', name: 'Week 3', items: [
            { value: 'Connor Rose Delisle', label: 'Connor Rose Delisle' },
            { value: 'Jim Chen', label: 'Jim Chen' },
            { value: 'Evan Berghoff', label: 'Evan Berghoff' }
          ]
        },
        {
          type: 'group', name: 'Week 4', items: [
            { value: 'Luis Kwun Man Lo', label: 'Luis Kwun Man Lo' },
            { value: 'Nicolas Pita', label: 'Nicolas Pita' },
            { value: 'Henry Taing', label: 'Henry Taing' }
          ]
        },
        {
          type: 'group', name: 'Week 5', items: [
            { value: 'Steven Nguyen', label: 'Steven Nguyen' },
            { value: 'Grace Kim', label: 'Grace Kim' },
            { value: 'Mercer Stronck', label: 'Mercer Stronck' }
          ]
        },
        {
          type: 'group', name: 'Week 6', items: [
            { value: 'Hien Nguyen', label: 'Hien Nguyen' },
            { value: 'Frank Norton', label: 'Frank Norton' },
            { value: 'Seungho Baek', label: 'Seungho Baek' }
          ]
        },
        {
          type: 'group', name: 'Week 7', items: [
            { value: 'Michael Miller', label: 'Michael Miller' },
            { value: 'John Madrigal', label: 'John Madrigal' },
            { value: 'Benjamin Kwak', label: 'Benjamin Kwak' },
          ]
        },
        {
          type: 'group', name: 'Week 8', items: [
            { value: 'Alex Sanhueza', label: 'Alex Sanhueza' },
            { value: 'Justin Choo', label: 'Justin Choo' }
          ]
        },
        {
          type: 'group', name: 'Week 9', items: [
            { value: 'Sean Haverstock', label: 'Sean Haverstock' },
            { value: 'Muhammad Trad', label: 'Muhammad Trad' }
          ]
        },
        {
          type: 'group', name: 'Week 10', items: [
            { value: 'Andy Wang', label: 'Andy Wang' },
            { value: 'Jack Crish', label: 'Jack Crish' }
          ]
        },
        {
          type: 'group', name: 'Week 11', items: [
            { value: 'Michelle Holland', label: 'Michelle Holland' },
            { value: 'Wyatt Bell', label: 'Wyatt Bell' }
          ]
        },
        {
          type: 'group', name: 'Week 12', items: [
            { value: 'Catherine Chiu', label: 'Catherine Chiu' },
            { value: 'Spenser Schwarts', label: 'Spenser Schwarts' }
          ]
        },
      ],
      residents: null,
    }
    this.createReview = this.createReview.bind(this);
    this.handleDropdownSelect = this.handleDropdownSelect.bind(this);
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

  createReview(body) {
    /*
     * Setup data object to POST to backend
     */
    // Fellow id is passed down from ReviewContainer
    const { fellow_id } = this.props;
    // Week and resident_id should be set with dropdown
    const { chosenWeek, chosenResidentId } = this.state;
    const reviewObj = {
      body,
      fellow_id,
      resident_id: chosenResidentId,
      week: chosenWeek,
    }

    /*
     * Send data to create new review in backend
     */
    fetch('/api/addReview', {
      method: 'POST',
      body: JSON.stringify({ reviewObj }),
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
    })
      .then(res => res.json())
      .then((data) => {
        console.log('Got JSON response back from POST to addReview: ', data);
        // Set parent state to rerender ReviewContainer rather than CreateReview component
        this.props.viewMode();
      })
      .catch((e) => {
        console.log('createReview: ERROR: ', e);
      });
  }

  handleDropdownSelect(e) {
    console.log('resident selected out of list: ', e.target);
    // this.setState({chosenResidentId: e._id});
  }

  render() {
    // TODO: parse chosen week and student roster github handles to provide direct links to repos!
    // TODO: request data via GET request to residentsController (?) getAllResidents middleware
    // let studentRoster = ['Haejin Jo', 'Serena Kuo', 'Justin Choo', 'Wyatt Bell'];
    const weekNums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

    if (this.state.residents) {
      const residentDropdownItems = [];
      let resident = null;
      for (let i = 0; i < this.state.residents.length; i += 1) {
        resident = this.state.residents[i];
        residentDropdownItems.push(
          <Dropdown.Item key={`ddiKey${i}`}>
            {resident.username}
          </Dropdown.Item>
        );
      }

      const weekDropdownItems = [];
      let week = null;
      for (let i = 0; i < weekNums.length; i += 1) {
        week = weekNums[i];
        weekDropdownItems.push(
          <Dropdown.Item key={`wdiKey${i}`}>
            {week}
          </Dropdown.Item>
        );
      }

      return (
        <div className="createReview">
          <h4>Week {this.state.chosenWeek} Assessment Review for Resident {this.state.reviewee}</h4><br />
      Choose Resident and Week to Review:<br />
          {/* <Dropdown options={this.state.dropdownOptions} placeholder='Select a resident to review' /><br /> */}
          <div class='dropDownButtons'>
            <DropdownButton title='Select Resident'>
              {residentDropdownItems}
            </DropdownButton>
            <DropdownButton title='Select Assessment Week'>
              {weekDropdownItems}
            </DropdownButton>
          </div>
          <textarea className='newReviewBody' /><br />
          <button>Submit Review</button>
        </div >
      );
    }
    else {
      return (<div>Preparing residents in current cohort...</div>);
    }
  }
}

export default CreateReview;