import axios from 'axios';

// Action Types
export const GET_USER_REQUEST = 'GET_USER_REQUEST';
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
export const GET_USER_FAILURE = 'GET_USER_FAILURE';

export const GET_ALL_USERS_REQUEST = 'GET_ALL_USERS_REQUEST';
export const GET_ALL_USERS_SUCCESS = 'GET_ALL_USERS_SUCCESS';
export const GET_ALL_USERS_FAILURE = 'GET_ALL_USERS_FAILURE';

export const UPDATE_USER_REQUEST = 'UPDATE_USER_REQUEST';
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS';
export const UPDATE_USER_FAILURE = 'UPDATE_USER_FAILURE';

export const DELETE_USER_REQUEST = 'DELETE_USER_REQUEST';
export const DELETE_USER_SUCCESS = 'DELETE_USER_SUCCESS';
export const DELETE_USER_FAILURE = 'DELETE_USER_FAILURE';

// Get User
export const getUser = (userId) => {
  return async (dispatch) => {
    dispatch({ type: GET_USER_REQUEST });
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/users/${userId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      dispatch({
        type: GET_USER_SUCCESS,
        payload: response.data
      });
    } catch (error) {
      dispatch({
        type: GET_USER_FAILURE,
        payload: error.response?.data?.error || error.message
      });
    }
  };
};

// Get All Users
export const getAllUsers = () => {
  return async (dispatch) => {
    dispatch({ type: GET_ALL_USERS_REQUEST });
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/users/`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      console.log(response.data);
      
      dispatch({
        type: GET_ALL_USERS_SUCCESS,
        payload: response.data
      });
    } catch (error) {
      dispatch({
        type: GET_ALL_USERS_FAILURE,
        payload: error.response?.data?.error || error.message
      });
    }
  };
};

// Update User
export const updateUser = (userId, userData) => {
  return async (dispatch) => {
    dispatch({ type: UPDATE_USER_REQUEST });
    try {
      const response = await axios.put(`${import.meta.env.VITE_API_URL}/api/users/${userId}`, userData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      dispatch({
        type: UPDATE_USER_SUCCESS,
        payload: response.data
      });
    } catch (error) {
      dispatch({
        type: UPDATE_USER_FAILURE,
        payload: error.response?.data?.error || error.message
      });
    }
  };
};

// Delete User
export const deleteUser = (userId) => {
  return async (dispatch) => {
    dispatch({ type: DELETE_USER_REQUEST });
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/users/${userId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      dispatch({
        type: DELETE_USER_SUCCESS
      });
    } catch (error) {
      dispatch({
        type: DELETE_USER_FAILURE,
        payload: error.response?.data?.error || error.message
      });
    }
  };
};
