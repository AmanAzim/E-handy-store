import React, {useContext} from 'react';
import PayPalButton from './PayPalButton';
import {ProductContext} from '../../context';
import {connect} from 'react-redux';

const CartTotal = (props) => {

    const context=useContext(ProductContext);

    const {cartSubtotal, cartTax, cartTotal}=context;

    return (
        <React.Fragment>
            <div className="container">
                <div className="row">
                    <div className="col-10 col-sm-8 mt-2 ml-sm-5 ml-md-auto text-capitalize text-right">
                        <button className="btn btn-outline-danger mb-3 px-5" onClick={()=>context.clearCart()}>CLEAR CART</button>
                        <h5><span className="text-title">Subtotal : </span><b>${cartSubtotal}</b></h5>
                        <h5><span className="text-title">Tax : </span><b>${cartTax}</b></h5>
                        <h5><span className="text-title">Cart Total : </span><b>${cartTotal}</b></h5>
                        <PayPalButton total={cartTotal} clearCart={context.clearCart}/>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

const mapStateToProps=(state)=>{
    return {

    }
};
const mapDispatchToProps=(dispatch)=>{
    return {

    }
};

export default CartTotal;
