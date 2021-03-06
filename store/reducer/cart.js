import {ADD_TO_CART,REMOVE_CART_ITEM} from '../action/cart';
import {ADD_ORDER} from '../action/order';
import {DELETE_PRODUCT} from '../action/product';
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
            case REMOVE_CART_ITEM:{
                const selectedCartItem=state.items[action.pid];
                const currentQty=selectedCartItem.quantity;
                let updatedCartItems;
                if(currentQty>1){
                    const updatedCartItem=new CartItem(
                        selectedCartItem.quantity-1,
                        selectedCartItem.productPrice,
                        selectedCartItem.productTitle,
                        selectedCartItem.sum-selectedCartItem.productPrice
                    )
                    updatedCartItems={...state.items,[action.pid]:updatedCartItem}
                }else{
                    updatedCartItems={...state.items};
                    delete updatedCartItems[action.pid];
                }
                return{
                    ...state,
                    items:updatedCartItems,
                    totalAmount:(state.totalAmount-selectedCartItem.productPrice).toFixed(2)
                }
            }
            case ADD_ORDER:
                return initialState;
            case DELETE_PRODUCT:{
                if(!state.items[action.pid])
                {
                    return state;
                }
                const updatedItems={...state.items};
                const itemTotal=state.items[action.pid].sum;
                delete updatedItems[action.pid]
                return{
                    ...state,
                    items:updatedItems,
                    totalAmount:state.totalAmount-itemTotal

                }
            }//end delete product case
    }

    return state
}