//product-list-frontend/app/store/slices/configureStore

import rootReducer from "./rootReducer";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: rootReducer,
});

export default store;