import * as Types from './../constants/ActionType'
var initialState = {};

var itemEditing = (state = initialState, action) => {
    switch (action.type) {
        case Types.GET_EDIT_PRODUCT:
            return action.product;;
    
        default: return state;
    }
}



export default itemEditing