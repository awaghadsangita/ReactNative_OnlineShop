import React from 'react';
import {View,Text,StyleSheet, Button,FlatList} from 'react-native';
import {useSelector} from 'react-redux';

import CartItem from '../../components/CartItem';
const CartScreen = props =>{
    const cartTotalAmount=useSelector(state=>state.cart.totalAmount)
    
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
            return transformedCartItem
        });
        console.log(cartItems)
    return (
    <View style={styles.container}>
        <View style={styles.summary}>
            <Text style={styles.totalPrice}>${cartTotalAmount}</Text>
            <Button title="Order Now" color="#4a0803"/>
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
                        onRemove={()=>{}}
                    />
                }
            />
        </View>
    </View>)
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