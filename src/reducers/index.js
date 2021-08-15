import { combineReducers } from "redux";
import Products from "./Products";

const AppReducer = combineReducers({
    Products: Products,
})

export default AppReducer;