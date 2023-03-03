import React, { useState, useEffect } from "react"; // 16.0 set the different components, name the component and export them
import RestaurantDataService from "../services/restaurant.js"; // 19.0 we import the useEffect and useState from React hooks and the restaurant file from services to get acces to all methods to make requests from the server
import { Link } from "react-router-dom";

const RestaurantsList = (props) => {
  const [restaurants, setRestaurants] = useState([]); // 19.1 we need to create all these items, variable states, for all types of search that the user can do on the page and keep track on them and update them
  const [searchName, setSearchName] = useState("");
  const [searchZip, setSearchZip] = useState("");
  const [searchCuisine, setSearchCuisine] = useState("");
  const [cuisines, setCuisines] = useState(["All Cuisines"]);

  useEffect(() => {
    // 19.2 we use a react hook useEffect, this is the way that react hooks tells react that your component needs to do something after render
    retrieveRestaurants();
    retrieveCuisines();
  }, []);

  const onChangeSearchName = (e) => {
    // 19.3 people can search for by name, zip or cuisine in a form on the client, what they type on the search it will get catched by the "e.target.value"
    const searchName = e.target.value;
    setSearchName(searchName); // and then update the state variable
  };

  const onChangeSearchZip = (e) => {
    const searchZip = e.target.value;
    setSearchZip(searchZip);
  };

  const onChangeSearchCuisine = (e) => {
    const searchCuisine = e.target.value;
    setSearchCuisine(searchCuisine);
  };

  const retrieveRestaurants = () => {
    RestaurantDataService.getAll()
      .then((response) => {
        console.log(response.data);
        setRestaurants(response.data.restaurants);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const retrieveCuisines = () => {
    RestaurantDataService.getCuisines()
      .then((response) => {
        console.log(response.data);
        setCuisines(["All Cuisines"].concat(response.data));
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const refreshList = () => {
    retrieveRestaurants();
  };

  const find = (query, by) => {
    // 19.4 the find functin is passing the "query" and the "by", the query is what the user searches and the by is the type of query (name, zipcode, cuisine)
    RestaurantDataService.find(query, by)
      .then((response) => {
        console.log(response.data);
        setRestaurants(response.data.restaurants);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const findByName = () => {
    find(searchName, "name");
  };

  const findByZip = () => {
    find(searchZip, "zipcode");
  };

  const findByCuisine = () => {
    if (searchCuisine === "All Cuisine") {
      refreshList();
    } else {
      find(searchCuisine, "cuisine");
    }
  };

  return (
    <div>
      <div className="row pb-1">
        <div className="input-group col-lg-4">
          {/* 19.5 users can search for 3 different parameters, name, zipcode and cuisine */}
          <input
            type="text"
            className="form-control"
            placeholder="Search by name"
            value={searchName}
            onChange={onChangeSearchName}
          />
          {/* 19.6 theres an input that users can type to search by name, and a button to call the findByName function*/}
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByName}
            >
              Search
            </button>
          </div>
        </div>
        <div className="input-group col-lg-4">
          <input
            type="text"
            className="form-control"
            placeholder="Search by zip"
            value={searchZip}
            onChange={onChangeSearchZip}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByZip}
            >
              Search
            </button>
          </div>
        </div>
        <div className="input-group col-lg-4">
          <select onChange={onChangeSearchCuisine}>
            {" "}
            {/* 19.7 for the search of the cuisine it will be a dropdown menu */}
            {cuisines.map((cuisine) => {
              // 19.7 onChangeSearchCuisine it will be called when some user selects one option of the dropdown menu
              return (
                // 19.8 will have to iterate the cuisines array to show each option for each cuisine and it will
                <option value={cuisine}> {cuisine.substring(0, 21)} </option> // 19.9 use substring to ensure the length of the cuisine is not too long
              );
            })}
          </select>
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByCuisine}
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <div className="row">
        {restaurants.map((restaurant) => {
          // 19.9 for each restaurant we get the address and return every type of information and also a Link to view the reviews
          const address = `${restaurant.address.building} ${restaurant.address.street}, ${restaurant.address.zipcode}`;
          return (
            <div className="col-lg-4 pb-1">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{restaurant.name}</h5>
                  <p className="card-text">
                    <strong>Cuisine: </strong>
                    {restaurant.cuisine}
                    <br />
                    <strong>Address: </strong>
                    {address}
                  </p>
                  <div className="row">
                    <Link
                      to={"/restaurants/" + restaurant._id}
                      className="btn btn-primary col-lg-5 mx-1 mb-1"
                    >
                      View Reviews
                    </Link>
                    <a
                      target="_blank"
                      href={"https://www.google.com/maps/place/" + address}
                      className="btn btn-primary col-lg-5 mx-1 mb-1"
                      rel="noreferrer"
                    >
                      View Map
                    </a>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RestaurantsList;
