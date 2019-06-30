//Here we dont need Enzyme because we are just checking JavaScript functions of Reducer

import reducer from './reducer';
import * as actionTypeName from './action-type-names';

describe('reducer',()=>{

    it('should return the initial state', ()=>{
        expect(reducer(undefined, {})).toEqual({
            products:[],
            detailProduct:{},
            cart:[],
            modalOpen:false,
            modalProduct:{},
            cartSubtotal:0,
            cartTax:0,
            cartTotal:0,
        });
    });

    it('should open modal upon clicking button', ()=>{
        expect(reducer({ //Our initial State
            products:[],
            detailProduct:{},
            cart:[],
            modalOpen:false,
            modalProduct:{},
            cartSubtotal:0,
            cartTax:0,
            cartTotal:0,
        }, {type:actionTypeName.OPEN_MODAL, //Passed Action
                  modalProduct:{},
                  modalOpen:true} ) ).toEqual({ //Expected state after the Action
            products:[],
            detailProduct:{},
            cart:[],
            modalOpen:true,
            modalProduct:{},
            cartSubtotal:0,
            cartTax:0,
            cartTotal:0,
        });
    })

});
