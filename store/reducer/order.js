import {ADD_ORDER,FETCH_ORDER} from '../action/order';
import Order from '../../model/order';

const initialState={
    orders:[]
}

export default (state=initialState,action)=>{
    switch(action.type){
        case FETCH_ORDER:{
            return{
                orders:action.orders
            }
        }//end fetch order case
        case ADD_ORDER:{
            const newOrder=new Order(
                action.orderData.id,
                action.orderData.items,
                action.orderData.amount,
                action.orderData.date
            )
            return{
                ...state,
                orders:state.orders.concat(newOrder)
            }
        }//end ADD_ORDER_Case
    }
    return state;
}