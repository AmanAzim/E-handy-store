import React, {Component} from 'react';
import './Product.css';
import {NavLink} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import * as actions from '../store/actions';



class Product extends Component {


    render() {

        //const {id, title, img, price, inCart}=this.props.products[this.props.index];//If we use promise then we don\t need to access the current product info like this
        const {id, title, img, price, inCart}=this.props.product;

        return (
            <div className="col-9 mx-auto col-md-6 col-lg-3 my-3">
                <div className="card">

                    <div className="img-container py-5" onClick={()=>this.props.onHandelDetail(id)}>

                        <NavLink to="/details"><img src={img} alt="product" className="card-img-top"/></NavLink>

                        <button className="cart-btn" disabled={inCart} onClick={()=>{this.props.onAddToCart(id);  this.props.onOpenModal(id);}}>
                            {inCart? (<p className="mb-0">In Cart</p>):(<i className="fas fa-cart-plus"/>)}
                        </button>

                    </div>

                    <div className="card-footer d-flex justify-content-between">
                        <p className="align-self-center mb-0">{title}</p>
                        <h5 className="text-red mb-0"><span className="mr-1">$</span>{price}</h5>
                    </div>
                </div>
            </div>
        );
    }
}

Product.propTypes={
    product: PropTypes.shape({
        id:PropTypes.number,
        img:PropTypes.string,
        title:PropTypes.string,
        price:PropTypes.number,
        inCart:PropTypes.bool,
    }).isRequired
};

const mapStateToProps=(state)=>{
    return {
        products:state.products
    }
};
const mapDispatchToProps=(dispatch)=>{
    return {
        onHandelDetail:(id)=>dispatch(actions.handelDetail(id)),
        onAddToCart:(id)=>dispatch(actions.asyn_addToCart(id)),
        onOpenModal:(id)=>dispatch(actions.openModal(id))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Product);

