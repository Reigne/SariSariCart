import axios from "axios";

import {
  CREATE_CATEGORY_REQUEST,
  CREATE_CATEGORY_SUCCESS,
  CREATE_CATEGORY_FAIL,
  CREATE_CATEGORY_RESET,
  ALL_CATEGORY_REQUEST,
  ALL_CATEGORY_SUCCESS,
  ALL_CATEGORY_FAIL,
  SINGLE_CATEGORY_REQUEST,
  SINGLE_CATEGORY_SUCCESS,
  SINGLE_CATEGORY_FAIL,
  UPDATE_CATEGORY_REQUEST,
  UPDATE_CATEGORY_SUCCESS,
  UPDATE_CATEGORY_FAIL,
  UPDATE_CATEGORY_RESET,
  DELETE_CATEGORY_REQUEST,
  DELETE_CATEGORY_SUCCESS,
  DELETE_CATEGORY_RESET,
  DELETE_CATEGORY_FAIL,
  CLEAR_ERRORS,
} from "../constants/categoryConstants";

export const createCategory = (categoryData) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_CATEGORY_REQUEST });
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    const { data } = await axios.post(
      `${process.env.REACT_APP_API}/api/v1/category/create/`,
      categoryData,
      config
    );

    dispatch({
      type: CREATE_CATEGORY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.log("actions error", error);

    dispatch({
      type: CREATE_CATEGORY_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const allCategories = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_CATEGORY_REQUEST });
    const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/categories`);

    dispatch({
      type: ALL_CATEGORY_SUCCESS,
      payload: data.categories,
    });
  } catch (error) {
    dispatch({
      type: ALL_CATEGORY_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const singleCategory = (id) => async (dispatch) => {
  try {
    dispatch({ type: SINGLE_CATEGORY_REQUEST });

    const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/category/${id}`);

    dispatch({
      type: SINGLE_CATEGORY_SUCCESS,
      payload: data.category,
    });
  } catch (error) {
    dispatch({
      type: SINGLE_CATEGORY_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const updateCategory = (id, categoryData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_CATEGORY_REQUEST });
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    const { data } = await axios.put(
      `${process.env.REACT_APP_API}/api/v1/category/${id}`,
      categoryData,
      config
    );
    dispatch({
      type: UPDATE_CATEGORY_SUCCESS,
      payload: data,
    });

    console.log("actions: ", data.success);
  } catch (error) {
    dispatch({
      type: UPDATE_CATEGORY_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const resetUpdateCategory = () => (dispatch) => {
  dispatch({ type: UPDATE_CATEGORY_RESET });
};

export const resetDeleteCategory = () => (dispatch) => {
  dispatch({ type: DELETE_CATEGORY_RESET });
};

export const deleteCategory = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_CATEGORY_REQUEST });
    const { data } = await axios.delete(`${process.env.REACT_APP_API}/api/v1/category/${id}`);
    dispatch({
      type: DELETE_CATEGORY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DELETE_CATEGORY_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};
