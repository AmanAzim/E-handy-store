import React,{useContext} from 'react';
import {ProductContext} from '../../context';
import CartItem from './cartItem';
import {connect} from 'react-redux';

const CartList = (props) => {

    const context=useContext(ProductContext);

    return (
        <div className="container-fluid">
            {   props.cart.map(item=>{
                    return <CartItem key={item.id} item={item}/>
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
