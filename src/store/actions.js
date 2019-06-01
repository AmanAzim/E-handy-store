import * as actionTypeName from './action-type-names';
import {storeProducts, detailProduct} from '../data';

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
export const setProducts=(products)=>{
    return {
        type:actionTypeName.SETPRODUCTS,
        products:products
    }
};
