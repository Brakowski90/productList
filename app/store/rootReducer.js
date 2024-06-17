//product-list-frontend/app/store/slices/rootReducer

import productReducer from "./slices/productSlice";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  products: productReducer,
});

export default rootReducer;
