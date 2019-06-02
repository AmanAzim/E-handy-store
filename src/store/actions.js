import * as actionTypeName from './action-type-names';
import {storeProducts, detailProduct} from '../data';
import {store} from '../index';//we need "store" to use "getState" outside of "return (dispatch, getState)=>{}"

export const asyn_setProducts=()=>{
    return (dispatch)=>{
        let tempProducts=[];
        storeProducts.forEach((item)=>{
            const singleItem={...item};
            tempProducts=[...tempProducts, singleItem];
        });

        dispatch(setProducts(tempProducts));
    }
};
const setProducts=(products)=>{
    return {
        type:actionTypeName.SETPRODUCTS,
        products:products
    }
};
////////////////////////////////////////////////

const getItem=(id)=>{
    const product= store.getState().products.find((product) => {
        return product.id === id;
    });
    console.log('product', product);
    return product;
};
export const handelDetail=(id)=>{
    return {
        type:actionTypeName.HANDEL_DETAIL,
        detailProduct:getItem(id)
    };
};
//////////////////////////////////////////////////
export const asyn_addToCart=(id)=>{
    return (dispatch)=>{
        let tempProducts=[...store.getState().products];
        let index=tempProducts.findIndex(product=>product.id===id);
        let product=tempProducts[index];

        product.inCart=true;
        product.count=1;
        const tempPrice=product.price;
        product.total=tempPrice;
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
    //console.log('subTotal:'+subTotal);
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
