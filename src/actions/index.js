import * as Types from './../constants/ActionType';
import callAPI from '../utils/apiCaller';


//action này gọi api lấy về products list
export const actFetchProductsRequest = () => {
    return (dispatch) => {
        return callAPI('products', 'get', null).then(response => {
            dispatch(actFetchProduct(response.data))
        })
    }
}
//action này lấy products list đa lấy được từ server và lưu vào store
export const actFetchProduct = (products) => {
    return {
        type: Types.FETCH_PRODUCT,
        products: products
    }
}
