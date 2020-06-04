import {ADD_TO_CART} from '../action/cart';
import CartItem from '../../model/CartItem';

initialState={
    items:{},
    totalAmount:0
}

export default (state=initialState,action)=>{
    switch(action.type){
        case ADD_TO_CART:
            const addedProduct=action.product;
            const prodPrice=addedProduct.price;
            const prodTitle=addedProduct.title;
            
            if(state.items[addedProduct.id]){
                const upatedCartItem=new CartItem(
                    state.items[addedProduct.id].quantity+1,
                    prodPrice,
                    prodTitle,
                    state.items[addedProduct.id].sum+prodPrice
                ) 
                
                return{
                    ...state,
                    items:{
                        ...state.items,
                        [addedProduct.id]:upatedCartItem
                    },
                    totalAmount:state.totalAmount+prodPrice

                }
            }else{
                const newCartItem=new CartItem(
                    1,
                    prodPrice,
                    prodTitle,
                    prodPrice
                );
                
                return{
                    ...state,
                    items:{...state.items,[addedProduct.id]:newCartItem},
                    totalAmount:state.totalAmount+prodPrice
                }

            }
    }

    return state
}