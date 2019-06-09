import * as actionTypeName from './action-type-names';
import {storeProducts, detailProduct} from '../data';
import {store} from '../index';//we need "store" to use "getState" outside of "return (dispatch, getState)=>{}"
import axios from 'axios';

//////////////////////////////////////////////////////////
export const asyn_setProducts=()=>{
    return (dispatch)=>{
        let serverProducts=[];

        axios.get('https://e-handy-store.firebaseio.com/storeProducts.json')
            .then(res=>{
                serverProducts=res.data;
                console.log('serveradata',serverProducts);
                dispatch(setProducts(serverProducts));
            }).then(()=>{
                dispatch(loadDetailOnReload())
            }).catch(err=>console.log(err));
        /*
        let tempProducts=[];
        storeProducts.forEach((item)=>{
            const singleItem={...item};
            tempProducts=[...tempProducts, singleItem];
        });
        console.log('localData',tempProducts);
        console.log('set_product');
        */
    }
};
const setProducts=(products)=>{
    return {
        type:actionTypeName.SETPRODUCTS,
        products:products
    }
};
//////////////////////////////////////////////////////////
export const handelDetail=(id)=>{
    const product= store.getState().products.find(product=>product.id===id);

    let index=store.getState().products.findIndex(product=>product.id===id);
    localStorage.setItem('detailProductIndex', index);

    return {
        type:actionTypeName.HANDEL_DETAIL,
        detailProduct:product
    };
};
export const loadDetailOnReload=()=>{
    const index=localStorage.getItem('detailProductIndex');
    const loadedProductId=store.getState().products[index].id;
   return (dispatch)=>{
       dispatch(handelDetail(loadedProductId))
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
        //1st way of making Promise
        return new Promise((resolve)=>{
            if(dispatch(addToCart(tempProducts, product))){
                resolve(dispatch(addTotal()))
            }
        })
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
        //2nd way of creating Promise
        let p1= new Promise((resolve)=>{
            resolve(dispatch(increment(tempCart)))
        });
        p1.then(()=>dispatch(addTotal()));
       // dispatch(increment(tempCart));
        //dispatch(addTotal());
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
            /* let tempProducts=[...store.getState().products];
             let index=tempProducts.findIndex(item=>item.id===id);
             let product=tempProducts[index];

             product.inCart=false;
             product.count=0;
             product.total=0;

             let tempCart=store.getState().cart.filter(item=>item.id!==id);

             dispatch(removeItem(tempProducts, tempCart));
             dispatch(addTotal()); */
            dispatch(asyn_removeItem(id))
        } else {
            //3rd way of creating Promise
            return new Promise((resolve)=>{
                resolve(dispatch(decrement(tempCart)))
            }).then(()=>dispatch(addTotal()));
            //dispatch(decrement(tempCart));
            //dispatch(addTotal());
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

        //dispatch(removeItem(tempProducts, tempCart));
        //dispatch(addTotal());
        return new Promise(resolve => {
            resolve(dispatch(removeItem(tempProducts, tempCart)));
        }).then(()=>dispatch(addTotal()))
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
    const product= store.getState().products.find(product=>product.id===id);
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

