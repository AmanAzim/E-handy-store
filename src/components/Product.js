import React, {Component} from 'react';
import './Product.css';
import styled from 'styled-components';
import {ProductContext} from '../context';
import {NavLink} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

const ProductWrapper=styled.div`
    
`;

class Product extends Component {

    static contextType=ProductContext;

    render() {

        const {id, title, img, price, inCart}=this.props.product;

        return (
            <div className="col-9 mx-auto col-md-6 col-lg-3 my-3">
                <div className="card">

                    <div className="img-container py-5" onClick={()=>this.context.handelDetail(id)}>

                        <NavLink to="/details"><img src={img} alt="product" className="card-img-top"/></NavLink>

                        <button className="cart-btn" disabled={inCart} onClick={()=>{this.context.addToCart(id);  this.context.openModal(id);}}>
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

    }
};
const mapDispatchToProps=(dispatch)=>{
    return {

    }
};

export default Product;

