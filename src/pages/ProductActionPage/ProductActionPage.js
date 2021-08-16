import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { actAddProductRequest, actGetEditProductRequest, actUpdateProductRequest } from '../../actions/index';

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
        if (match) {
            var id = match.params.id;
            if (id) {
                this.props.onGetEditProduct(id);
            }
        }

    }

    // static getDerivedStateFromProps(nextProps, prevState) {

    //     if(nextProps.itemEditing!==prevState.itemEditing) {
    //         return {
    //             id: nextProps.itemEditing.id,
    //             txtName: nextProps.itemEditing.name,
    //             txtPrice: nextProps.itemEditing.price,
    //             chkbStaus: nextProps.itemEditing.status
    //         }
    //     }
    //     else return null;
    // }

    componentDidUpdate(prevProps) {
        if (prevProps.itemEditing !== this.props.itemEditing) {
            this.setState({
                id: this.props.itemEditing.id,
                txtName: this.props.itemEditing.name,
                txtPrice: this.props.itemEditing.price,
                chkbStaus: this.props.itemEditing.status
            });
        }
    }

    onChange = (e) => {
        var target = e.target;
        var name = target.name;
        var value = target.type === 'checkbox' ? target.checked : target.value;
        this.setState({
            [name]: value
        })

    }
    //khi lick vào button save
    onSave = (e) => {
        e.preventDefault();
        var { txtName, txtPrice, chkbStaus, id } = this.state;
        var product = {
            id: id,
            name: txtName,
            price: txtPrice,
            status: chkbStaus
        }
        var { history } = this.props;
        //edit
        if (this.state.id) {
            this.props.onUpdateProduct(product);
        }
        //add
        else {
            this.props.onAddProduct(product);
        }
        //Trở về trang xem danh sách sản phẩm
        history.goBack();

    }
    render() {
        var { txtName, txtPrice, chkbStaus } = this.state;
        return (
            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                <form onSubmit={this.onSave}>
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
const mapStateToProps = (state) => {
    return {
        itemEditing: state.itemEditing
    }
}
const mapDispatchToProps = (dispatch, props) => {
    return {
        onAddProduct: (product) => {
            dispatch(actAddProductRequest(product))
        },
        onGetEditProduct: (id) => {
            dispatch(actGetEditProductRequest(id))
        },
        onUpdateProduct: (product) => {
            dispatch(actUpdateProductRequest(product))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductActionPage)