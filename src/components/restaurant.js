import React, { useState, useEffect } from "react"; // 16.0 set the different components, name the component and export them
import RestaurantDataService from "../services/restaurant.js" // 19.0 we import the useEffect and useState from React hooks and the restaurant file from services to get acces to all methods to make requests from the server
import { Link } from "react-router-dom"

const Restaurant = props => {  // 20.0 change to antoher type of function that recieves the props from?
  const initalRestaurantState = {
    id: null,
    name: "",
    address: {},
    cuisine: "",
    reviews: []
  }

  const [restaurant, setRestaurant] = useState(initalRestaurantState); // 20.1 we set the restaurant state variabel to initialRestaurant State value (empty fields)

  const getRestaurant = id => { // 20.3 the useEffect will update when the restaurant id is updated and will call the getRestaurant function
    RestaurantDataService.get(id) //20.4 call the axios method of "RestaurantDataService.get" and get a restaurant with the id specified on the function parameters
      .then(response => {
        setRestaurant(response.data); //  and update the state variable with the restaurant found result
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    getRestaurant(props.match.params.id); // 20.2 called when the component first renders, only called if the restaurant id is updated
  }, [props.match.params.id]);
  
  const deleteReview = (reviewId, index) => { // 20.5 only can delete if you are the user that created the review
    RestaurantDataService.deleteReview(reviewId, props.user.id) // 20.6 delete the review with find it by their id
      .then(response => {
        setRestaurant((prevState) => { // 20.7 then set the restaurant variable with the current restaurant and with the reviews array spliced with the review deleted, finally will get the same restaurant
          prevState.reviews.splice(index, 1); // with the reviews array updated without the deleted review
          return ({
            ...prevState
          })
        })
      })
      .catch(e => {
        console.log(e);
      })
  }


  return (
    <div>
      {restaurant ? (
        <div>
          <h5>{restaurant.name}</h5>
          <p>
            <strong>Cuisine: </strong>{restaurant.cuisine}<br/>
            <strong>Address: </strong>{restaurant.address.building} {restaurant.address.street}, {restaurant.address.zipcode}
          </p>
          <Link to={"/restaurants/" + props.match.params.id + "/review"} className="btn btn-primary">
            Add Review
          </Link>
          <h4> Reviews </h4>
          <div className="row">
            {restaurant.reviews.length > 0 ? (
             restaurant.reviews.map((review, index) => {
               return (
                 <div className="col-lg-4 pb-1" key={index}>
                   <div className="card">
                     <div className="card-body">
                       <p className="card-text">
                         {review.text}<br/>
                         <strong>User: </strong>{review.name}<br/>
                         <strong>Date: </strong>{review.date}
                       </p>
                       {props.user && props.user.id === review.user_id &&
                          <div className="row">
                            <a onClick={() => deleteReview(review._id, index)} className="btn btn-primary col-lg-5 mx-1 mb-1">Delete</a>
                            <Link to={{
                              pathname: "/restaurants/" + props.match.params.id + "/review",
                              state: {
                                currentReview: review
                              }
                            }} className="btn btn-primary col-lg-5 mx-1 mb-1">Edit</Link>
                          </div>                   
                       }
                     </div>
                   </div>
                 </div>
               );
             })
            ) : (
            <div className="col-sm-4">
              <p>No reviews yet.</p>
            </div>
            )}

          </div>

        </div>
      ) : (
        <div>
          <br />
          <p>No restaurant selected.</p>
        </div>
      )}
    </div>
  );
}

export default Restaurant;