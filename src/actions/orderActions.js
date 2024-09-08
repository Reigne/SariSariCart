// src/actions/orderActions.js
import axios from "axios";
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
  GET_ORDER_BY_ID_REQUEST,
  GET_ORDER_BY_ID_SUCCESS,
  GET_ORDER_BY_ID_FAIL,
  CLEAR_ERRORS,
} from "../constants/orderConstants";

// Create a new order
export const createOrder = (orderData) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_ORDER_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };

    const { data } = await axios.post(
      `${process.env.REACT_APP_API}/api/v1/order`,
      orderData,
      config
    );

    dispatch({
      type: CREATE_ORDER_SUCCESS,
      payload: data.order,
    });
  } catch (error) {
    console.log("error actions: ", error);
    dispatch({
      type: CREATE_ORDER_FAIL,
      payload: error.response.data.errMessage,
    });
  }
};

// Get a specific order by ID
export const getOrder = (orderId) => async (dispatch) => {
  try {
    dispatch({ type: GET_ORDER_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };

    const { data } = await axios.get(`/api/v1/order/${orderId}`, config);

    dispatch({
      type: GET_ORDER_SUCCESS,
      payload: data.order,
    });
  } catch (error) {
    dispatch({
      type: GET_ORDER_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Update an order
export const updateOrder = (orderId, orderData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_ORDER_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.put(
      `/api/orders/update/${orderId}`,
      orderData,
      config
    );

    dispatch({
      type: UPDATE_ORDER_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_ORDER_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get user's orders based on category (all, pending, completed, etc.)
export const getMyOrders =
  (status = "all") =>
  async (dispatch) => {
    try {
      dispatch({ type: MY_ORDERS_REQUEST });

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      };

      // Add status as a query parameter in the request
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/my-orders?status=${status}`,
        config
      );

      dispatch({
        type: MY_ORDERS_SUCCESS,
        payload: data.orders, // Assuming orders are returned in the response
      });
    } catch (error) {
      dispatch({
        type: MY_ORDERS_FAIL,
        payload: error.response.data.message || "Failed to fetch orders",
      });
    }
  };

// Clear Errors
export const clearErrors = () => (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
