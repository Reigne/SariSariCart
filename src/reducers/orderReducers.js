// src/reducers/orderReducers.js
import {
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAIL,
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  GET_ORDER_FAIL,
  UPDATE_ORDER_REQUEST,
  UPDATE_ORDER_SUCCESS,
  UPDATE_ORDER_FAIL,
  MY_ORDERS_REQUEST,
  MY_ORDERS_SUCCESS,
  MY_ORDERS_FAIL,
  CLEAR_ERRORS,
} from "../constants/orderConstants";

// Create Order Reducer
export const newOrderReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_ORDER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case CREATE_ORDER_SUCCESS:
      return {
        loading: false,
        order: action.payload,
        orderSuccess: true,
      };
    case CREATE_ORDER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

// Get Order Reducer
export const orderDetailsReducer = (state = { order: {} }, action) => {
  switch (action.type) {
    case GET_ORDER_REQUEST:
      return {
        loading: true,
        ...state,
      };
    case GET_ORDER_SUCCESS:
      return {
        loading: false,
        order: action.payload,
      };
    case GET_ORDER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

// Update Order Reducer
export const updateOrderReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_ORDER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_ORDER_SUCCESS:
      return {
        loading: false,
        isUpdated: action.payload,
      };
    case UPDATE_ORDER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const myOrdersReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case MY_ORDERS_REQUEST:
      return {
        loading: true,
        orders: [],
      };
    case MY_ORDERS_SUCCESS:
      return {
        loading: false,
        orders: action.payload, // Update orders when fetch is successful
      };
    case MY_ORDERS_FAIL:
      return {
        loading: false,
        error: action.payload, // Store the error message
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
