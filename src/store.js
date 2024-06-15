import {
  legacy_createStore as createStore,
  combineReducers,
  applyMiddleware,
} from "redux";
import { thunk } from "redux-thunk";
import { composeWithDevTools } from "@redux-devtools/extension";

import {
  createCategoryReducer,
  categoriesReducer,
  singleCategoryReducer,
  updateCategoryReducer,
  deleteCategoryReducer,
} from "./reducers/categoryReducers";

const reducer = combineReducers({
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
