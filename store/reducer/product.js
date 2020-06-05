import PRODUCTS from '../../data/Dummay-Data';
import {DELETE_PRODUCT} from '../action/product';
const initialState={
    availableProducts:PRODUCTS,
    userProducts:PRODUCTS.filter(product=>product.ownerId=='u1')
}

export default (state=initialState,action)=>{
    switch(action.type){
        case DELETE_PRODUCT:{
            return {
                ...state,
                userProducts: state.userProducts.filter(product=>product.id!==action.pid),
                availableProducts: state.availableProducts.filter(product=>product.id!==action.pid),
            }
        }//end delete product case
    }
    return state;
}