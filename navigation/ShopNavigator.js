import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import ProductOverviewScreen from '../screens/shop/ProductOverviewScreen';
import ProductDetailsScreen from '../screens/shop/ProductDetailsScreen';
import CartScreen from '../screens/shop/CartScreen';

const ProductNavigator=createStackNavigator({
    ProductOverview:{screen:ProductOverviewScreen},
    ProductDetails:{screen:ProductDetailsScreen},
    Cart:CartScreen
},{
    defaultNavigationOptions:{
        headerStyle:{
            backgroundColor:"#4a0803"
        },
        headerTintColor:'white'
    }
})
export default createAppContainer(ProductNavigator);