import React,{useState} from 'react';
import {View,Text,StyleSheet, Button,FlatList,ActivityIndicator} from 'react-native';
import {useSelector,useDispatch} from 'react-redux';

import CartItem from '../../components/CartItem';
import * as cartAction from '../../store/action/cart';
import * as ordersActions from '../../store/action/order';

const CartScreen = props =>{
    const [isLoading,setIsLoading]=useState(false)
    const cartTotalAmount=useSelector(state=>state.cart.totalAmount)
    const dispatch=useDispatch();
    const cartItems=useSelector(state=>
        {
            const transformedCartItem=[];
            for(const key in state.cart.items){
                if(state.cart.items[key].productPrice!=undefined)
                transformedCartItem.push({
                    productId:key,
                    productTitle:state.cart.items[key].productTitle,
                    productPrice:state.cart.items[key].productPrice,
                    quantity:state.cart.items[key].quantity,
                    sum:state.cart.items[key].sum
                })
            }
            return transformedCartItem.sort((a,b)=>a.productId>b.productId?1:-1)
        });
        const sendOrderHandler=async ()=>{
            setIsLoading(true)
            await dispatch(ordersActions.addOrder(cartItems,cartTotalAmount));
            setIsLoading(false)
        }
        if(isLoading){
            return(
                <View style={styles.center}>
                    <Text> No Ordered Placed Yet</Text>
                </View>
            )
        }
    return (
    <View style={styles.container}>
        <View style={styles.summary}>
            <Text style={styles.totalPrice}>${cartTotalAmount}</Text>
            <Button title="Order Now" 
                    color="#4a0803" 
                    onPress={sendOrderHandler}/>
        </View>
        <View>
            <FlatList
                data={cartItems}
                keyExtractor={item=>item.productId}
                renderItem={itemData=>
                    <CartItem
                        title={itemData.item.productTitle}
                        price={itemData.item.price}
                        quantity={itemData.item.quantity}
                        sum={itemData.item.sum}
                        deletable
                        onRemove={()=>{
                            dispatch(cartAction.removeCartItem(itemData.item.productId))
                        }}
                    />
                }
            />
        </View>
    </View>)
}

CartScreen.navigationOptions=navigationData=>{
    return{
        title:'Your Cart Details'
    }
}

const styles=StyleSheet.create({
    container:{
        margin:20
    },
    summary:{
        flexDirection:'row',
        justifyContent:'space-between'
    },
    totalPrice:{
        fontSize:22,
        fontWeight:'bold',
        color:"#4a0803"
    }
})

export default CartScreen;