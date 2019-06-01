import * as actionTypeName from './action-type-names';
import {storeProducts, detailProduct} from '../data';
import {store} from '../index';

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
