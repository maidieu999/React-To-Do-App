import *as Types from './../constants/ActionType';
var initialState = [];
var findIndex = (arr, id) => {
    var result = -1;
    arr.forEach((item, index) => {
        if(item.id === id) return result = index;
    });

    return result;
}
const Products = (state = initialState, action) => {
    var index = -1;
    switch (action.type) {
        case Types.FETCH_PRODUCT:
            state = action.products;
            return [...state]
        case Types.DELETE_PRODUCT:
            state = state.filter(el => el.id !== action.productId )
            return [...state];
        case Types.ADD_PRODUCT: 
            state.push(action.product);
            return [...state];
        case Types.UPDATE_PRODUCT:
            index = findIndex(state, action.product.id);
            state[index] = action.product;
            return [...state]

        default: return [...state];
    }
}

export default Products;