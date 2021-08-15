import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class ProductItem extends Component {
    onDelete = (productId) => {
        if(confirm('Ban chac chan muon xoa san pham nay?')) { //eslint-disable-line
            this.props.onDelete(productId)
        }
    }
    render() {
        var { product, index } = this.props;
        var statusName = product.status === true ? 'In Stocks' : 'Out Of Stocks';
        var statusClass = product.status === true ? 'info' : 'warning';
        return (
            <tr>
                <td>{index + 1}</td>
                <td>{ product.id }</td>
                <td>{ product.name }</td>
                <td>{ product.price }</td>
                <td>
                    <span className={`label label-${statusClass}`}>
                        { statusName }
                    </span>
                </td>
                <td>
                    <Link to={`/product/edit/${product.id}`} type="button" className="btn btn-success" >Edit</Link>
                    
                    &nbsp;
                    <button type="button" className="btn btn-danger" onClick={ () => this.onDelete(product.id) }>Delete</button>
                </td>
            </tr>
        )
    }
}

export default ProductItem;