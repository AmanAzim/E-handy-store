import React from 'react';
import PayPalButton from './PayPalButton';
import {connect} from 'react-redux';
import * as actions from "../../store/actions";

const CartTotal = (props) => {

    return (
        <React.Fragment>
            <div className="container">
                <div className="row">
                    <div className="col-10 col-sm-8 mt-2 ml-sm-5 ml-md-auto text-capitalize text-right">
                        <button className="btn btn-outline-danger mb-3 px-5" onClick={()=>props.onClearCart()}>CLEAR CART</button>
                        <h5><span className="text-title">Subtotal : </span><b>${props.cartSubtotal}</b></h5>
                        <h5><span className="text-title">Tax : </span><b>${props.cartTax}</b></h5>
                        <h5><span className="text-title">Cart Total : </span><b>${props.cartTotal}</b></h5>
                        <PayPalButton total={props.cartTotal} clearCart={props.onClearCart}/>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

const mapStateToProps=(state)=>{
    return {
        cartSubtotal:state.cartSubtotal,
        cartTax:state.cartTax,
        cartTotal:state.cartTotal
    }
};
const mapDispatchToProps=(dispatch)=>{
    return {
        onClearCart:()=>dispatch(actions.clearCart())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(CartTotal);
