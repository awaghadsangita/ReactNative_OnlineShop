import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import ProductOverviewScreen from '../screens/shop/ProductOverviewScreen';
const ProductNavigator=createStackNavigator({
    ProductOverview:ProductOverviewScreen
},{
    defaultNavigationOptions:{
        headerStyle:{
            backgroundColor:"#4a0803"
        },
        headerTintColor:'white'
    }
})
export default createAppContainer(ProductNavigator);