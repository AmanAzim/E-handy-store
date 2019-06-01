import {storeProducts, detailProduct} from '../data';
import * as actionTypeName from './action-type-names';

const initialState={
    products:[], //because the array is too big we kept in separate file and imported it.
    detailProduct:{...detailProduct},
    cart:[],
    modalOpen:false,
    modalProduct:{...detailProduct},
    cartSubtotal:0,
    cartTax:0,
    cartTotal:0,
};

const reducer=(state=initialState, action)=>{
    switch (action.type) {
        case actionTypeName.SETPRODUCTS:
            return {
              ...state,
              products: action.products
            };
    }
    return state;
};

export default reducer;
