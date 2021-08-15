import React, { Component } from 'react';
import ProductList from '../../components/ProductList/ProductList';
import ProductItem from '../../components/ProductItem/ProductItem';
import { connect } from 'react-redux';
import apiCaller from './../../utils/apiCaller';
import { Link } from 'react-router-dom';
import { actFetchProductsRequest } from '../../actions/index';
class ProductListPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: []
        }
    }
    //componentDidMount goi sau khi component render lan dau tien
    componentDidMount() {
        // apiCaller('products', 'get', null).then(response => {
        //     this.props.onFetchProduct(response.data)
        // })

        //len api lay du lieu ve, luu vao store 
        this.props.onFetchProduct();
    }
    onDeleteItem = (productId) => {
        var { products } = this.props;
        apiCaller(`products/${productId}`, 'delete', null)
            .then(res => {
                // Nếu xóa thành công trên server thì cũng xóa trên state của page luôn
                if(res.status === 200) {
                    var index = this.findIndex(products, productId);
                    products.splice(index, 1);

                    this.setState({
                        products: products
                    })
                }
            })
    }
    findIndex = (arr, id) => {
        var result = -1;
        if(arr.length > 0) {
            arr.forEach((item, index) => {
                if(item.id === id) {
                    result = index;
                    return result;
                }
            });
        }
        return result;
    }
    
    render() {
        var { products } = this.props;
        return (
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <Link type="button" className="btn btn-info mb-10" to='/product/add'>Add Product</Link>
                <ProductList>
                    {this.showProducts(products)}
                </ProductList>
            </div>
        )
    }
    showProducts = (products) => {
        var result = null;
        if (products.length > 0) {
            result = products.map((product, index) => {
                return <ProductItem
                    key={index}
                    product={product}
                    index={index}
                    onDelete={this.onDeleteItem}
                />
            })
        }
        return result;
    }
}
const mapStateToProps = (state) => {
    return {
        products: state.Products,
    }
}
const mapDispatchToProps = (dispatch, props) => {
    return {
        onFetchProduct: () => {
            dispatch(actFetchProductsRequest())
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ProductListPage);