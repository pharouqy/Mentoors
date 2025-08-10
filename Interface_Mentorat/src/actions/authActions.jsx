import axios from "axios";

export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE';

export const login = ({ email, password }) => {
  return (dispatch) => {
    dispatch({ type: LOGIN_REQUEST });
    axios
      .post(
        `${import.meta.env.VITE_API_URL}/api/users/login`,
        {
          email,
          password,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      )
      .then((response) => {
        const { user, token } = response.data || {};
        // Persist first
        localStorage.setItem("token", JSON.stringify(token));
        localStorage.setItem("user", JSON.stringify(user));
        // Then update Redux with only the user object
        dispatch({ type: LOGIN_SUCCESS, payload: user });
      })
      .catch((error) => {
        dispatch({ type: LOGIN_FAILURE, payload: error.message });
      });
  };
};

// Logout User
export const logout = () => {
  return async (dispatch) => {
    dispatch({ type: LOGOUT_REQUEST });
    try {
      await axios.get(`${import.meta.env.VITE_API_URL}/api/users/logout`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      dispatch({ type: LOGOUT_SUCCESS });
    } catch (error) {
      dispatch({
        type: LOGOUT_FAILURE,
        payload: error.response?.data?.error || error.message
      });
    }
  };
};