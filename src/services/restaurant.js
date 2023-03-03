import http from "../http-common.js"; // 18.0 import "http" file to use axios

class RestaurantDataService {
  // 18.1 inside the class "RestaurantDataService" we will define all the functions that will get the infromation from all the api calls defined on each function

  getAll(page = 0) {
    return http.get(`?page=${page}`); // 18.2 getAll method will send a GET request to the baserURL (defined in "http" file) + the query that is specified in the parameter (?page=${page})
  }

  get(id) {
    return http.get(`/id/${id}`); // 18.3 method to get a specific restaurant by id
  }

  find(query, by = "name", page = 0) {
    return http.get(`${by}=${query}&page=${page}`); // 18.4 find method takes the search term "query" (ex.01293), "by" will specify the search by zipcode, name or cuisine, and finally that
  } // will add to the baseURL to do the GET request from that url to server

  createReview(data) {
    return http.post("/review", data);
  }

  updateReview(data) {
    return http.put("/review", data);
  }

  deleteReview(id) {
    return http.delete(`/review?id=${id}`);
  }

  getCuisines(id) {
    return http.get(`/cuisines`);
  }
}

export default new RestaurantDataService();
