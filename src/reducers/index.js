import { combineReducers } from "redux";
import Products from "./Products";
import itemEditing from "./itemEditing";

const AppReducer = combineReducers({
    Products: Products,
    itemEditing: itemEditing

})

export default AppReducer;