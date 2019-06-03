import React,{useContext} from 'react';
import {ProductContext} from '../../context';
import CartItem from './cartItem';
import {connect} from 'react-redux';

const CartList = (props) => {

    const context=useContext(ProductContext);

    return (
        <div className="container-fluid">
            {   props.cart.map((item,index)=>{
                    return <CartItem key={item.id} index={index}/>
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
