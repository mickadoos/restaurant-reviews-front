// import React from "react"; // 16.0 set the different components, name the component and export them
import React, { useState } from "react"; // 21.0 update the import React and useState


const Login = props => {

  const initialUserState = {
    name: "",
    id: ""
  };
  
  const [user, setUser] = useState(initialUserState); // 21.1 set the user state variable to the intialUserState (blank)

  const handleInputChange = event => { // 21.2 when the user types or changes the value of the input, the input will trigger this "handleInputChange" function with "onChange" property
    const { name, value } = event.target;  // event.target will get the name and the value from the input target
    setUser({ ...user, [name]: value });  // and set the user with new name and id
  };

  const login = () => {
    props.login(user); // 21.4 this is "props.login" that is different from the "login" function on "longin.js" component, on the App.js routes, we created a route to="/login" 
                       // that has a property of "login" that is assigned with a login function on the App Component.
                       /* async function login(user = null) { // 16.7 we create a simple dummy login/logout function, that is not what a login system should look like
                         setUser(user);
                          } */
    props.history.push('/'); // 21.3 .history updates the URL to "/" (home page)
  }
  return (
    <div className="submit-form">
      <div>
        <div className="form-group">
          <label htmlFor="user">Username</label>
          <input
            type="text"
            className="form-control"
            id="name"
            required
            value={user.name}
            onChange={handleInputChange}
            name="name"
          />
        </div>

        <div className="form-group">
          <label htmlFor="id">ID</label>
          <input
            type="text"
            className="form-control"
            id="id"
            required
            value={user.id}
            onChange={handleInputChange}
            name="id"
          />
        </div>

        <button onClick={login} className="btn btn-success">
          Login
        </button>
      </div>
    </div>
  );
}

export default Login;