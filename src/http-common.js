import axios from "axios"; // 17.0 we have to install the libray "axios" for the requests (get, post, put, delete)
                           // 17.1 this file is a helper file that we export to use axios for the services files

export default axios.create({
    baseURL: "http://localhost:5000/api/v1/restaurants", // 17.2 this is the backend server URL, and all the routes of the backend server come after this
    headers: {
        "Content-type": "application/json"
    }
});