import React from 'react';
import {connect} from 'react-redux';
import * as actions from '../../store/actions';

const CartItem = (props) => {

    //const {id, title, img, price, total, count}=props.cart[props.index]; //If we use Promise in action creator then we don't need to extract current item/product info from cart like this
    const {id, title, imgUrl, price, total, count}=props.item;

    return (
        <div className="row my-2 text-center text-capitalize">
            {/*Image Col*/}
            <div className="col-10 col-lg-2 mx-auto">
                <img src={imgUrl} style={{width:'5rem',height:'5rem'}} className="img-fluid" alt="Product Image" />
            </div>

            {/*Product Col*/}
            <div className="col-10 col-lg-2 mx-auto">
                <span className="d-lg-none">Product: </span >{title}
            </div>

            {/*Price Col*/}
            <div className="col-10 col-lg-2 mx-auto">
                <span className="d-lg-none">Price: </span ><b>€{price}</b>
            </div>

            {/*Quantity button Col*/}
            <div className="col-10 col-lg-2 mx-auto my-2 my-lg-0">
                <div className="d-flex justify-content-center">
                    <span className="btn btn-black mx-1" onClick={()=>props.onDecrement(id)}>-</span>
                    <span className="btn btn-black mx-1">{count}</span>
                    <span className="btn btn-black mx-1" onClick={()=>props.onIncrement(id)}>+</span>
                </div>
            </div>

            {/*Remove button Col*/}
            <div className="col-10 col-lg-2 mx-auto">
                <div className="cart-icon" onClick={()=>props.onRemoveItem(id)}>
                    <i className="fas fa-trash"></i>
                </div>
            </div>

            {/*Total Col*/}
            <div className="col-10 col-lg-2 mx-auto">
                <b>Item total : €{total}</b>
            </div>
        </div>
    );
};

const mapStateToProps=(state)=>{
  return {
      cart:state.cart
  }
};

const mapDispatchToProps=(dispatch)=>{
    return {
        onIncrement:(id)=>dispatch(actions.asyn_increment(id)),
        onDecrement:(id)=>dispatch(actions.asyn_decrement(id)),
        onRemoveItem:(id)=>dispatch(actions.asyn_removeItem(id))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(CartItem);
