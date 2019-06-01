import React, {Component} from 'react';
import {ProductContext} from '../../context';
import Title from '../title';
import CartColumns from './CartColumns';
import EmptyCart from './emptyCart';
import CartList from './cartList';
import CartTotal from './cartTotal';
import {connect} from 'react-redux';

class Cart extends Component {
    static contextType=ProductContext;

    render() {
        let content='';
        if(this.context.cart.length>0){
            content=(
                <React.Fragment>
                    <Title name="Your" title="Cart"/>
                    <CartColumns/>
                    <CartList/>
                    <CartTotal/>
                </React.Fragment>
            );
        }else {
            content=<EmptyCart/>;
        }

        return (
            <section className="py-3">
                {content}
            </section>
        );
    }
}

const mapStateToProps=(state)=>{
    return {

    }
};
const mapDispatchToProps=(dispatch)=>{
    return {

    }
};

export default Cart;
