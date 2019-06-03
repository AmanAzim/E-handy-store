import * as actionTypeName from './action-type-names';
import {storeProducts, detailProduct} from '../data';
import {store} from '../index';//we need "store" to use "getState" outside of "return (dispatch, getState)=>{}"


//////////////////////////////////////////////////////////
export const asyn_setProducts=()=>{
    return (dispatch)=>{
        let tempProducts=[];
        storeProducts.forEach((item)=>{
            const singleItem={...item};
            tempProducts=[...tempProducts, singleItem];
        });
        console.log('set_product');
        dispatch(setProducts(tempProducts));
    }
};
const setProducts=(products)=>{
    return {
        type:actionTypeName.SETPRODUCTS,
        products:products
    }
};
//////////////////////////////////////////////////////////

const getItem=(id)=>{
    const product= store.getState().products.find((product) => {
        return product.id === id;
    });

    return product;
};
export const handelDetail=(id)=>{
    return {
        type:actionTypeName.HANDEL_DETAIL,
        detailProduct:getItem(id)
    };
};
/////////////////////////////////////////////////////////
export const asyn_addToCart=(id)=>{
    return (dispatch)=>{
        let tempProducts=[...store.getState().products];
        let index=tempProducts.findIndex(product=>product.id===id);
        let product=tempProducts[index];

        product.inCart=true;
        product.count=1;
        product.total=product.price;
        console.log('tempProducts',tempProducts);
        dispatch(addToCart(tempProducts, product));
        dispatch(addTotal());
    };
};
const  addToCart=(tempProducts, product)=>{
    return {
        type:actionTypeName.ADD_TO_CART,
        tempProducts:tempProducts,
        product:product
    }
    //this.setState({products:tempProducts, cart:[...this.state.cart, product]}, ()=>{this.addTotal()} );
};
export const addTotal=()=>{
    let subTotal=0;
    for(let i=0;i<store.getState().cart.length;i++){
        subTotal +=store.getState().cart[i].total;
    }

    let tempTax=subTotal*0.1;
    tempTax=parseFloat(tempTax.toFixed(2));

    let total=subTotal+tempTax;

    return {
        type:actionTypeName.ADD_TOTAL,
        cartSubtotal:subTotal,
        cartTax:tempTax,
        cartTotal:total
    };
};

export const asyn_increment=(id)=>{

    let tempCart=[...store.getState().cart];
    let index=tempCart.findIndex(item=>item.id===id);
    let product=tempCart[index];

    product.count++;
    product.total+=product.price;

    return (dispatch)=>{
        dispatch(increment(tempCart));
        dispatch(addTotal());
    }
};
const increment=(tempCart)=>{
    return {
        type:actionTypeName.INCREMENT,
        cart:tempCart
    }
};
export const asyn_decrement=(id)=>{
    return (dispatch)=>{
        let tempCart=[...store.getState().cart];
        let index=tempCart.findIndex(item=>item.id===id);
        let product=tempCart[index];

        product.count--;
        product.total-=product.price;

        if(product.count<=0){

             let tempProducts=[...store.getState().products];
             let index=tempProducts.findIndex(item=>item.id===id);
             let product=tempProducts[index];

             product.inCart=false;
             product.count=0;
             product.total=0;

             let tempCart=store.getState().cart.filter(item=>item.id!==id);

             dispatch(removeItem(tempProducts, tempCart));
             dispatch(addTotal());

        } else {
            dispatch(decrement(tempCart));
            dispatch(addTotal());
        }
    };
};
const decrement=(tempCart)=>{
    return {
        type:actionTypeName.DECREMENT,
        cart:tempCart
    }
};
///////////////////////////////////////////////////////////
export const asyn_removeItem=(id)=>{
    return (dispatch)=>{
        let tempProducts=[...store.getState().products];
        let index=tempProducts.findIndex(item=>item.id===id);
        let product=tempProducts[index];

        product.inCart=false;
        product.count=0;
        product.total=0;

        let tempCart=store.getState().cart.filter(item=>item.id!==id);

        dispatch(removeItem(tempProducts, tempCart));
        dispatch(addTotal());
    }
};
const removeItem=(tempProducts, tempCart)=>{
    return {
        type:actionTypeName.REMOVE_ITEM,
        products:tempProducts,
        cart:tempCart
    };
};


export const clearCart=()=>{
    let tempProducts=[...store.getState().products];
    tempProducts.map(item=>{
        item.inCart=false;
        item.count=0;
        item.total=0;
    });

    return {
        type:actionTypeName.CLEAR_CART,
        products:tempProducts,
        cartSubtotal:0,
        cartTax:0,
        cartTotal:0,
        cart:[]
    }
};
///////////////////////////////////////////////////////////
export const openModal=(id)=>{
    const product=getItem(id);
    return {
        type:actionTypeName.OPEN_MODAL,
        modalProduct:product,
        modalOpen:true
    };
};
export const closeModal=()=>{
    return {
        type:actionTypeName.CLOSE_MODAL,
        modalOpen:false
    };
};
//////////////////////////////////////////////////////////

