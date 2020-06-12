import React,{useEffect} from 'react';
import {View,FlatList,Text,StyleSheet} from 'react-native';
import {useSelector,useDispatch} from 'react-redux';
import {HeaderButtons,Item} from 'react-navigation-header-buttons';

import HeaderButton from '../../components/UI/HeaderButton';
import OrderItem from '../../components/OrderItem';
import * as orderActions from '../../store/action/order';
const OrderScreen =props=>{
    const orders=useSelector(state=>state.orders.orders);
    const dispatch=useDispatch();
    
    useEffect(()=>{
        dispatch(orderActions.fetchOrder())
    },[dispatch])
    if(orders.length==0){
        return(<View style={styles.container}><Text style={styles.message}>No Order Placed yet</Text></View>)
    }
    
    return(
        <FlatList
            data={orders}
            keyExtractor={item=>item.id}
            renderItem={itemData=><OrderItem
                totalAmount={itemData.item.totalAmount}
                date={itemData.item.readableDate}
                items={itemData.item.items}
            />}
            
    />)
}

OrderScreen.navigationOptions=navigationData=>{
    return{
        title:'Your Orders',
        headerLeft:()=><HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                    title='menu'
                    iconName='md-menu'
                    onPress={()=>{
                        navigationData.navigation.toggleDrawer()
                    }}
                />
                </HeaderButtons>

    }
}

const styles=StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    message:{
        fontSize:18,
        fontWeight:'bold',
        color:"#4a0803"
    },
    center:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    }
})
export default OrderScreen;