export const ADD_ORDER='ADD_ORDER';

export const addOrder=(cartItem,totalAmount)=>{
    return async dispatch=>{
        const date=new Date();
        const response= await fetch("https://recipewebsite-95fbf.firebaseio.com/Orders.json",{
            method:'POST',
            header:{
                'content-type':'application/json'
            },
            body:JSON.stringify({
                cartItem,
                totalAmount,
                date
            })
        })
        const resData=await response.json();
        dispatch({
            type:ADD_ORDER,
            orderData:{
                id:resData.name,
                items:cartItem,
                amount:totalAmount,
                date:date
            }
        })
    }
}