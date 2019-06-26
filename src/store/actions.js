import * as actionTypeName from './action-type-names';
import {storeProducts, detailProduct} from '../data';
import {store} from '../index';//we need "store" to use "getState" outside of "return (dispatch, getState)=>{}"
import axios from 'axios';

//////////////////////////////////////////////////////////
export const asyn_setProducts=()=>{
    return (dispatch)=>{
        let serverProducts=[];

        axios.get(process.env.REACT_APP_SERVER)
            .then(res=>{
                serverProducts=res.data;
                console.log('serveradata',serverProducts);
                dispatch(setProducts(serverProducts));
            }).then(()=>{
                dispatch(loadDetailOnReload());
                dispatch(loadCartOnReload());
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
const loadDetailOnReload=()=>{
    const index=localStorage.getItem('detailProductIndex');
    const loadedProductId=store.getState().products[index].id;
   return (dispatch)=>{
       dispatch(handelDetail(loadedProductId))
   };
};
const loadCartOnReload=()=>{
    let stringToArr=localStorage.getItem('cart');
    const tempCart=JSON.parse(stringToArr);

    let tempProducts=[];
    store.getState().products.forEach((item)=>{
        const singleItem={...item};
        tempProducts=[...tempProducts, singleItem];
    });
    //Because we need to also change the main products list after reloading the cart from local storage or after reloading even though a item will be in the cart but in the main products list showed it will appear as new means with "inCart=false" and "count=0"
    for(let i=0; i<tempProducts.length; i++){
        for(let j=0; j<tempCart.length;j++){
            if(tempCart[j].id===tempProducts[i].id){
                tempProducts[i]={...tempCart[j]};
                break;
            }
        }
    }
    console.log('tempProducts',tempProducts);

    const cartSubtotal=localStorage.getItem('cartSubtotal');
    const cartTax=localStorage.getItem('cartTax');
    const cartTotal=localStorage.getItem('cartTotal');

    return (dispatch)=>{
        dispatch(reloadedCart(tempProducts, tempCart, cartSubtotal, cartTax, cartTotal))
    }
};
const reloadedCart=(tempProducts, tempCart, cartSubtotal, cartTax, cartTotal)=>{
    return {
        type:actionTypeName.RELOAD_CART,
        products:tempProducts,
        cart:tempCart,
        cartSubtotal:cartSubtotal,
        cartTax:cartTax,
        cartTotal:cartTotal
    }
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

        //1st way of making Promise
        return new Promise((resolve)=>{
            if(dispatch(addToCart(tempProducts, product))){
                resolve(dispatch(addTotal()))
            }
        }).then(()=>{
            saveCartOnBrowser();
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
        p1.then(()=>dispatch(addTotal())).then(()=>{saveCartOnBrowser();});
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
            }).then(()=>dispatch(addTotal())).then(()=>{saveCartOnBrowser();});
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
        }).then(()=>dispatch(addTotal())).then(()=>saveCartOnBrowser());
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
    removeCartFromBrowser();
    return {
        type:actionTypeName.CLEAR_CART,
        products:tempProducts,
        cartSubtotal:0,
        cartTax:0,
        cartTotal:0,
        cart:[]
    }
};
const saveCartOnBrowser=()=>{
    const StringCart=JSON.stringify(store.getState().cart)
    localStorage.setItem('cart', StringCart);
    localStorage.setItem('cartSubtotal', store.getState().cartSubtotal);
    localStorage.setItem('cartTax', store.getState().cartTax);
    localStorage.setItem('cartTotal', store.getState().cartTotal);
};
export const removeCartFromBrowser=()=>{
    localStorage.removeItem('cart');
    localStorage.removeItem('cartSubtotal');
    localStorage.removeItem('cartTax');
    localStorage.removeItem('cartTotal');
    localStorage.removeItem('detailProductIndex');
}
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

