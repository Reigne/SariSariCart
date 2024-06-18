import {
  legacy_createStore as createStore,
  combineReducers,
  applyMiddleware,
} from "redux";
import { thunk } from "redux-thunk";
import { composeWithDevTools } from "@redux-devtools/extension";

import { registerUser, authReducer } from "./reducers/userReducers";

import {
  createCategoryReducer,
  categoriesReducer,
  singleCategoryReducer,
  updateCategoryReducer,
  deleteCategoryReducer,
} from "./reducers/categoryReducers";

import {
  createProductReducer,
  productsReducer,
  singleProductReducer,
  updateProductReducer,
  deleteProductReducer,
} from "./reducers/productReducers";

const reducer = combineReducers({
  register: registerUser,
  auth: authReducer,
  products: productsReducer,
  createProduct: createProductReducer,
  singleProduct: singleProductReducer,
  updateProduct: updateProductReducer,
  deleteProduct: deleteProductReducer,
  createCategory: createCategoryReducer,
  categories: categoriesReducer,
  singleCategory: singleCategoryReducer,
  updateCategory: updateCategoryReducer,
  deleteCategory: deleteCategoryReducer,
});

const middlware = [thunk];
const store = createStore(
  reducer,
  // initialState,
  composeWithDevTools(applyMiddleware(...middlware))
);

export default store;
