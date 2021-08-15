import React, { Component } from 'react';
import callAPI from '../../utils/apiCaller';
import { Link } from 'react-router-dom';

class ProductActionPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            txtName: '',
            txtPrice: '',
            chkbStaus: ''
        }
    }

    componentDidMount() {
        var { match } = this.props;
        if(match) {
            var id = match.params.id;
        }
        callAPI(`products/${id}`, 'GET', null)
            .then(res => {
                this.setState({
                    id: res.data.id,
                    txtName: res.data.name,
                    txtPrice: res.data.price,
                    chkbStaus: res.data.status
                })
            })
    }

    onChange = (e) => {
        var target = e.target;
        var name = target.name;
        var value = target.type === 'checkbox' ? target.checked : target.value;
        this.setState({
            [name] : value
        })

    }
    onSave = (e) => {
        e.preventDefault();
        var { txtName, txtPrice, chkbStaus } = this.state;
        var { history } = this.props;
        if(this.state.id) {
            callAPI(`products/${this.state.id}`, 'PUT', {
                name: txtName,
                price: txtPrice,
                status: chkbStaus
            }).then(res => {
                history.goBack();
            })
        }
        else{
            callAPI('products', 'post', {
                name: txtName,
                price: txtPrice,
                status: chkbStaus
            })
                .then(res => {
                    //sau khi thêm thành công chuyển về trang xem danh sách sản phẩm
                    history.goBack();
    
                })
        }
        
    }
    render() {
        var { txtName, txtPrice, chkbStaus } = this.state;
        return (
            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                <form onSubmit={ this.onSave }>
                    <div className="form-group">
                        <label htmlFor="name">Name: </label>
                        <input
                            type="text"
                            className="form-control"
                            id='name'
                            placeholder="Input field"
                            name='txtName'
                            value={txtName}
                            onChange={this.onChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="price">Price: </label>
                        <input
                            type="number"
                            className="form-control"
                            id="price"
                            placeholder="Input field"
                            name='txtPrice'
                            value={txtPrice}
                            onChange={this.onChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor='status' >Status: </label>
                    </div>
                    <div className="checkbox">
                        <label>
                            <input
                                type="checkbox"
                                name='chkbStaus'
                                onChange={this.onChange}
                                checked={chkbStaus}
                            />
                            In Stocks
                        </label>
                    </div>
                    <Link to='/product-list' className="btn btn-info mr-10">Go Back Product List Page</Link>
                    <button type="submit" className="btn btn-primary">Save</button>
                    
                </form>
            </div>

        )
    }

}

export default ProductActionPage;