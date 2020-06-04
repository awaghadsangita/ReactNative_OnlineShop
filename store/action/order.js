export const ADD_ORDER='ADD_ORDER';

export const addOrder=(cartItem,totalAmout)=>{
    return{
        type:ADD_ORDER,
        orderData:{items:cartItem,amount:totalAmout}
    };
}