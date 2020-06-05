import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import {Ionicons} from '@expo/vector-icons';

import ProductOverviewScreen from '../screens/shop/ProductOverviewScreen';
import ProductDetailsScreen from '../screens/shop/ProductDetailsScreen';
import CartScreen from '../screens/shop/CartScreen';
import OrderScreen from '../screens/shop/OrdersScreen';

import UserProductScreen from '../screens/user/UserProductScreen';
const ProductNavigator=createStackNavigator({
    ProductOverview:{
        screen:ProductOverviewScreen,
        },
    ProductDetails:{screen:ProductDetailsScreen},
    Cart:CartScreen
},{
    navigationOptions:{
        drawerIcon:drawerConfig=><Ionicons
                                name="md-cart"
                                size={23}
                                color={drawerConfig.tintColor}/>
    },
    defaultNavigationOptions:{
        headerStyle:{
            backgroundColor:"#4a0803"
        },
        headerTintColor:'white'
    }
})

const OrderNavigator=createStackNavigator({
    Order:{
        screen:OrderScreen
    },
},{
    navigationOptions:{
        drawerIcon:drawerConfig=><Ionicons
                                name="md-list"
                                size={23}
                                color={drawerConfig.tintColor}/>
    },
    
    defaultNavigationOptions:{
        headerStyle:{
            backgroundColor:"#4a0803"
        },
        headerTintColor:'white'
    }
})

const AdminNavigator=createStackNavigator({
    UserProducts:{
        screen:UserProductScreen
    },
},{
    navigationOptions:{
        drawerIcon:drawerConfig=><Ionicons
                                name="md-list"
                                size={23}
                                color={drawerConfig.tintColor}/>
    },
    
    defaultNavigationOptions:{
        headerStyle:{
            backgroundColor:"#4a0803"
        },
        headerTintColor:'white'
    }
})

const ShopNavigator=createDrawerNavigator({
    Products:ProductNavigator,
    Order:OrderNavigator,
    Admin:AdminNavigator
},{
    contentOptions:{
        activeTintColor:"#4a0803"
    }
})
export default createAppContainer(ShopNavigator);