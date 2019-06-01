import React,{useContext} from 'react';
import {ProductContext} from '../../context';
import {connect} from 'react-redux';

const CartItem = (props) => {
    const context=useContext(ProductContext);

    const {id, title, img, price, total, count}=props.item;

    return (
        <div className="row my-2 text-center text-capitalize">
            {/*Image Col*/}
            <div className="col-10 col-lg-2 mx-auto">
                <img src={img} style={{width:'5rem',height:'5rem'}} className="img-fluid" alt="Product Image" />
            </div>

            {/*Product Col*/}
            <div className="col-10 col-lg-2 mx-auto">
                <span className="d-lg-none">Product: </span >{title}
            </div>

            {/*Price Col*/}
            <div className="col-10 col-lg-2 mx-auto">
                <span className="d-lg-none">Price: </span ><b>${price}</b>
            </div>

            {/*Quantity button Col*/}
            <div className="col-10 col-lg-2 mx-auto my-2 my-lg-0">
                <div className="d-flex justify-content-center">
                    <span className="btn btn-black mx-1" onClick={()=>context.decrement(id)}>-</span>
                    <span className="btn btn-black mx-1">{count}</span>
                    <span className="btn btn-black mx-1" onClick={()=>context.increment(id)}>+</span>
                </div>
            </div>

            {/*Remove button Col*/}
            <div className="col-10 col-lg-2 mx-auto">
                <div className="cart-icon" onClick={()=>context.removeItem(id)}>
                    <i className="fas fa-trash"></i>
                </div>
            </div>

            {/*Total Col*/}
            <div className="col-10 col-lg-2 mx-auto">
                <b>Item total : ${total}</b>
            </div>
        </div>
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

export default CartItem;
