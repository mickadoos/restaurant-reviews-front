// import React from "react"; // 16.0 set the different components, name the component and export them
import React, { useState } from "react";
import RestaurantDataService from "../services/restaurant.js";
import { Link } from "react-router-dom"; // 23.0 update the import to acces the RestaurantDataService and use useState

const AddReview = props => {
  let initalReviewState = "";

  let editing = false;

  if (props.location.state && props.location.state.currentReview) { // 23.1 checks if the current review is passed in througs props to this AddReview component, when user cliks edit review
    editing = true;                                                 // it passes in the state of current review and if the state is the currentReview then sets "editing" to true and updates the 
    initalReviewState = props.location.state.currentReview.text;    // state variable with the current review text
  }

  const [review, setReview] = useState(initalReviewState); // 23.2 keep track if the review is submitted or not
  const [submitted, setSumbitted] = useState(false);

  const handleInputChange = event => { 
    setReview(event.target.value);
  };

  const saveReview = () => { // 23.3 if you clik the submitt button (save) it will call "onClick" the "saveReview" function
    var data = {             // that creates the data with the information for the review, taken from the review state variable, the props where the user name and id is passed and the restaurant id taken from the params from the url
      text: review,
      name: props.user.name,
      user_id: props.user.id,
      restaurant_id: props.match.params.id
    };

    if (editing) {
      data.review_id = props.location.state.currentReview._id; // 23.4 if the user is editing then gets the currentReview id passing it from props
      RestaurantDataService.updateReview(data) // and call the updateReview method from the data service 
        .then(response => {
          setSumbitted(true);
          console.log(response.data);
        })
        .catch (e => {
          console.log(e);
        })
    } else {
      RestaurantDataService.createReview(data) // 23.5 if its not editing then we call the createReview method and pass it the data information to store a new review item on the database
        .then(response => {
          setSumbitted(true);
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        })
    }
  
  };

  
  return (
    <div>
      {props.user ? (
      <div className="submit-form">
        {submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <Link to={"/restaurants/" + props.match.params.id} className="btn btn-success">
              Back to Restaurant
            </Link>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="description">{ editing ? "Edit" : "Create" } Review</label>
              <input
                type="text"
                className="form-control"
                id="text"
                required
                value={review}
                onChange={handleInputChange}
                name="text"
              />
            </div>
            <button onClick={saveReview} className="btn btn-success">
              Submit
            </button>
          </div>
        )}
      </div>

      ) : (
      <div>
        Please log in.
      </div>
      )}

    </div>
  );
}

export default AddReview;