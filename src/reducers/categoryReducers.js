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
  
  export const createCategoryReducer = (state = { category: {} }, action) => {
    switch (action.type) {
      case CREATE_CATEGORY_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case CREATE_CATEGORY_SUCCESS:
        return {
          loading: false,
          success: action.payload.success,
          category: action.payload.category,
        };
      case CREATE_CATEGORY_FAIL:
        return {
          ...state,
          error: action.payload,
        };
      case CREATE_CATEGORY_RESET:
        return {
          ...state,
          success: false,
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
  
  export const categoriesReducer = (state = { categories: [] }, action) => {
    switch (action.type) {
      case ALL_CATEGORY_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case ALL_CATEGORY_SUCCESS:
        return {
          ...state,
          loading: false,
          categories: action.payload,
        };
      case ALL_CATEGORY_FAIL:
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
  
  export const singleCategoryReducer = (state = { category: {} }, action) => {
    switch (action.type) {
      case SINGLE_CATEGORY_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case SINGLE_CATEGORY_SUCCESS:
        return {
          ...state,
          loading: false,
          category: action.payload,
          success: true,
        };
      case SINGLE_CATEGORY_FAIL:
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
  
  export const updateCategoryReducer = (state = { category: {} }, action) => {
    switch (action.type) {
      case UPDATE_CATEGORY_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case UPDATE_CATEGORY_SUCCESS:
        return {
          ...state,
          loading: false,
          updateSuccess: true,
          category: action.payload.category,
        };
      case UPDATE_CATEGORY_FAIL:
        return {
          ...state,
          loading: false,
          errorUpdate: action.payload,
        };
      case UPDATE_CATEGORY_RESET: // Handle the reset action
        return {};
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };
      default:
        return state;
    }
  };
  
  export const deleteCategoryReducer = (state = { category: {} }, action) => {
    switch (action.type) {
      case DELETE_CATEGORY_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case DELETE_CATEGORY_SUCCESS:
        return {
          ...state,
          loading: false,
          isDeleted: action.payload.success,
        };
      case DELETE_CATEGORY_FAIL:
        return {
          ...state,
          loading: false,
          errorDelete: action.payload,
        };
      case DELETE_CATEGORY_RESET:
        return {};
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };
      default:
        return state;
    }
  };
  