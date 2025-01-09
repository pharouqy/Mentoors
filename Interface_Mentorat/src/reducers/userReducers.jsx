import {
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAILURE,
  GET_ALL_USERS_REQUEST,
  GET_ALL_USERS_SUCCESS, 
  GET_ALL_USERS_FAILURE,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILURE,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAILURE,
} from '../actions/userActions';

const initialState = {
  user: null,
  users: [],
  loading: false,
  error: null
};

const userReducers = (state = initialState, action) => {
  switch (action.type) {
    // GET USER
    case GET_USER_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    case GET_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload,
        error: null
      };
    case GET_USER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };

    // GET ALL USERS
    case GET_ALL_USERS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    case GET_ALL_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        users: action.payload,
        error: null
      };
    case GET_ALL_USERS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };

    // UPDATE USER  
    case UPDATE_USER_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload,
        error: null
      };
    case UPDATE_USER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };

    // DELETE USER
    case DELETE_USER_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    case DELETE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        user: null,
        error: null
      };
    case DELETE_USER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };

    default:
      return state;
  }
};

export default userReducers;
