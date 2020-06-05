import React from 'react';
import {FlatList} from 'react-native';
import {useSelector } from 'react-redux';
import {HeaderButtons,Item} from 'react-navigation-header-buttons';

import HeaderButton from '../../components/UI/HeaderButton';
import ProductItem from '../../components/ProductItem';

const UserProductScreen = props =>{
    const products=useSelector(state=>state.products.userProducts);
    return(
        <FlatList
            data={products}
            keyExtractor={item=>item.id}
            renderItem={productItem=><ProductItem
                title={productItem.item.title}
                price={productItem.item.price}
                image={productItem.item.image}
                onViewDetails={()=>{}}
                onAddToCart={()=>{}}
            />}
        />
    )
}
UserProductScreen.navigationOption=navigationData=>{
    return {
        title:"Yours Products",
        headerLeft:()=><HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                    title='menu'
                    iconName='md-menu'
                    onPress={()=>{
                        navigationData.navigation.toggleDrawer()
                    }}
                />
            </HeaderButtons>,
    }
}

export default UserProductScreen;