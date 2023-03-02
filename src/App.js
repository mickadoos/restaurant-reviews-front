// 15.0 Start creating the frontend, installed react-app, installed bootstrap and react-router-dom in the frontend folder

import React from "react"; // 15.1 now we modify and delete the default imports and create new imports for React, react-router-dom and bootstrap
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"; // 15.2 bootstrap is a frontend toolkit to style and personalize our app using some Javascript plugins

import AddReview from "./components/add-review"; // 16.1 import all the components created to the App component
import Restaurant from "./components/restaurant";
import RestaurantsList from "./components/restaurants-list";
import Login from "./components/login";

function App() { //16.2 copied the code from the App component in the github repository of the video, defines an App component using bootstrap and implementing 
  // 16.5 we create a user variable state by using react hooks
  const [user, setUser] = React.useState(null); // 16.6 we can use variable state to set an initial value to the variable when the page is load and we can update it using the "setUser" function
                                                // without reloading the page
  async function login(user = null) { // 16.7 we create a simple dummy login/logout function, that is not what a login system should look like
    setUser(user);
  }

  async function logout() {
    setUser(null);
  }
    
  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark"> 
        <a href="/restaurants" className="navbar-brand">
          Restaurant Reviews
        </a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/restaurants"} className="nav-link">  {/* // 16.3 Link is imported at the beginning of the file from react-router-dom, is a link to another route */}
              Restaurants
            </Link>
          </li>
          <li className="nav-item">
            {user ? (   // 16.4 this is a ternary statement (condition ? <expression if true> : <expression if false>), we can use {} to put some code inside the html component 
              <a        // in this case if the user exists it will show the <a> link, if user does not exist it will show a Link to go to the "/login" route
                onClick={logout} 
                className="nav-link"
                style={{ cursor: "pointer" }}
              >
                Logout {user.name}
              </a>
            ) : (
              <Link to={"/login"} className="nav-link">
                Login
              </Link>
            )}
          </li>
        </div>
      </nav>

      <div className="container mt-3"> {/* 16.8 we use a Switch to switch between routes */}
        <Switch>
          <Route
            exact
            path={["/", "/restaurants"]}
            component={RestaurantsList}
          />
          <Route
            path="/restaurants/:id/review"
            render={(props) => <AddReview {...props} user={user} />}
          />
          <Route
            path="/restaurants/:id"
            render={(props) => <Restaurant {...props} user={user} />}
          />
          <Route
            path="/login"
            render={(props) => <Login {...props} login={login} />}
          />
        </Switch>
      </div>
    </div>
  );
}

export default App;
