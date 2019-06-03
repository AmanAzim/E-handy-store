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
        case actionTypeName.HANDEL_DETAIL:
            return {
                ...state,
                detailProduct:action.detailProduct
            };
        case actionTypeName.ADD_TO_CART:
            return {
                ...state,
                products:action.tempProducts,
                cart:[...state.cart, action.product]
            };
        case actionTypeName.ADD_TOTAL:
            return {
                ...state,
                cartSubtotal:action.cartSubtotal,
                cartTax:action.cartTax,
                cartTotal:action.cartTotal
            };
        case actionTypeName.OPEN_MODAL:
            return {
                ...state,
                modalProduct:action.modalProduct,
                modalOpen:action.modalOpen
            };
        case actionTypeName.CLOSE_MODAL:
            return {
                ...state,
                modalOpen:action.modalOpen
            };
        case actionTypeName.CLEAR_CART:
            return {
                ...state,
                products:action.products,
                cartSubtotal:action.cartSubtotal,
                cartTax:action.cartTax,
                cartTotal:action.cartTotal,
                cart:action.cart
            };
        case actionTypeName.INCREMENT:
            return {
                ...state,
                cart:action.cart,
            };
        case actionTypeName.DECREMENT:
            return {
                ...state,
                cart:action.cart
            };
        case actionTypeName.REMOVE_ITEM:
            return {
                ...state,
                products:action.products,
                cart:action.cart
            };
    }
    return state;
};

export default reducer;
