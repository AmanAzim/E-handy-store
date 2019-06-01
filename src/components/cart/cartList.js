import React,{useContext} from 'react';
import {ProductContext} from '../../context';
import CartItem from './cartItem';
import {connect} from 'react-redux';

const CartList = () => {

    const context=useContext(ProductContext);

    return (
        <div className="container-fluid">
            {   context.cart.map(item=>{
                    return <CartItem key={item.id} item={item}/>
                })
            }
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

export default CartList;
