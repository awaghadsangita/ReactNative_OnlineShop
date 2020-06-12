import Order from '../../model/order';

export const ADD_ORDER='ADD_ORDER';
export const FETCH_ORDER='FETCH_ORDER';

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

export const fetchOrder=()=>{
    return async dispatch=>{
        const response= await fetch("https://recipewebsite-95fbf.firebaseio.com/Orders.json")
        const resData=await response.json();
        const orders=[]
        for(const key in resData){
            orders.push(new Order(
                key,
                resData[key].cartItem,
                resData[key].totalAmount,
                new Date(resData[key].date)))            
        }
        console.log(orders)
        dispatch({
            type:FETCH_ORDER,
            orders:orders
        })
    }
}