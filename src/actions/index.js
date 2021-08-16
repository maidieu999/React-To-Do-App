import * as Types from './../constants/ActionType';
import callAPI from '../utils/apiCaller';

//Doc
//action này gọi api lấy về products list
export const actFetchProductsRequest = () => {
    return (dispatch) => {
        return callAPI('products', 'get', null).then(response => {
            // console.log(response.data)
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
//Xoa
//goi api xoa product tren server, khi xoa thanh cong thi dispatch action xoa product trong store luon
export const actDeleteProductRequest = (productId) => {
    return(dispatch) => {
        return callAPI(`products/${productId}`, 'DELETE', null).then(res => {
            dispatch(actDeleteProduct(res.data.id))
        })
    }
}
export const actDeleteProduct = (productId) => {
    return {
        type: Types.DELETE_PRODUCT,
        productId: productId
    }
}
//Them
export const actAddProductRequest = (product) => {
    return(dispatch) => {
        return callAPI('products', 'POST', product).then(res => {
            dispatch(actAddProduct(res.data));
        })
    }
}
export const actAddProduct = (product) => {
    return {
        type: Types.ADD_PRODUCT,
        product: product
    }
}
//get edit product
export const actGetEditProductRequest = (id) => {
    return(dispatch) => {
        return callAPI(`products/${id}`, 'GET', null).then(res => {
            dispatch(actGetEditProduct(res.data));
        })
    }
}
export const actGetEditProduct = (product) => {
    return {
        type: Types.GET_EDIT_PRODUCT,
        product: product,

    }
}

//update product
export const actUpdateProductRequest = (product) => {
    return dispatch => {
        return callAPI(`products/${product.id}`, 'PUT', product).then(res => {
            dispatch(actUpdateProduct(res.data));
        })
    }
}
export const actUpdateProduct = (product) => {
    return {
        type: Types.UPDATE_PRODUCT,
        product: product,
    }
}

