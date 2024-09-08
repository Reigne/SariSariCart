import {
  legacy_createStore as createStore,
  combineReducers,
  applyMiddleware,
} from "redux";
import { thunk } from "redux-thunk";
import { composeWithDevTools } from "@redux-devtools/extension";

import {
  registerUser,
  authReducer,
  userReducer,
} from "./reducers/userReducers";

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

import {
  newOrderReducer,
  orderDetailsReducer,
  updateOrderReducer,
  myOrdersReducer,
} from "./reducers/orderReducers";

import { cartReducer } from "./reducers/cartReducers";

const reducer = combineReducers({
  cart: cartReducer,
  register: registerUser,
  auth: authReducer,
  user: userReducer,
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
  newOrder: newOrderReducer,
  orderDetails: orderDetailsReducer,
  updateOrder: updateOrderReducer,
  myOrders: myOrdersReducer,
});

let initialState = {
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
    shippingInfo: localStorage.getItem("shippingInfo")
      ? JSON.parse(localStorage.getItem("shippingInfo"))
      : {},
  },
};

const middlware = [thunk];
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middlware))
);

export default store;
