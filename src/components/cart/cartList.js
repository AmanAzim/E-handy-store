import React from 'react';
import CartItem from './cartItem';
import {connect} from 'react-redux';

const CartList = (props) => {

    return (
        <div className="container-fluid">
            {   props.cart.map((item,index)=>{
                    return <CartItem key={item.id} index={index} item={item}/>
                })
            }
        </div>
    );
};

const mapStateToProps=(state)=>{
    return {
        cart:state.cart,
    }
};

export default connect(mapStateToProps)(CartList);
