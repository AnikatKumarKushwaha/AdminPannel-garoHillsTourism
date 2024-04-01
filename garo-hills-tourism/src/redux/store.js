import { configureStore } from "@reduxjs/toolkit";
import attractionReducer from "./slice/attractionSlice";
import restplaceReducer from "./slice/restplaceSlice";
import userReducer from "./slice/UserSlice";
import operatorReducer from "./slice/operatorSlice";

export const store = configureStore({
  reducer: {
    attraction: attractionReducer,
    restplace: restplaceReducer,
    user: userReducer,
    operator: operatorReducer,
  },
});
