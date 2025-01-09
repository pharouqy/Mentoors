import axios from "axios";

export const SIGNUP_REQUEST = "SIGNUP_REQUEST";
export const SIGNUP_SUCCESS = "SIGNUP_SUCCESS";
export const SIGNUP_FAILURE = "SIGNUP_FAILURE";

// Thunk action for signup
export const signup = (userData) => {
  return (dispatch) => {
    dispatch({ type: SIGNUP_REQUEST });
    axios
      .post(`${import.meta.env.VITE_API_URL}/api/users/`, userData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
        },
      })
      .then((response) => {
        dispatch({ type: SIGNUP_SUCCESS, payload: response.data });
      })
      .catch((error) => {
        dispatch({ type: SIGNUP_FAILURE, payload: error.message });
      });
  };
};
