import React, { Component } from 'react';
import ProductList from '../../components/ProductList/ProductList';
import ProductItem from '../../components/ProductItem/ProductItem';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { actFetchProductsRequest, actDeleteProductRequest } from '../../actions/index';
class ProductListPage extends Component {

    //componentDidMount goi sau khi component render lan dau tien
    componentDidMount() {
        //len api lay du lieu ve, luu vao store 
        this.props.onFetchProduct();
    }
    onDeleteItem = (productId) => {
        this.props.onDeleteProduct(productId);
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
                    onDeleteItem={this.onDeleteItem}
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
        },
        onDeleteProduct: (productId) => {
            dispatch(actDeleteProductRequest(productId))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ProductListPage);