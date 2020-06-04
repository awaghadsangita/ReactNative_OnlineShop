import React from 'react';
import {FlatList,StyleSheet} from 'react-native';
import {useSelector,useDispatch} from 'react-redux';
import {HeaderButtons,Item} from 'react-navigation-header-buttons';

import ProductItem from '../../components/ProductItem'
import * as cartAction from '../../store/action/cart';
import HeaderButton from '../../components/UI/HeaderButton';

const ProductOverviewScreen =props=>{
    const products=useSelector(state=>state.products.availableProducts);
    const dispatch=useDispatch()
    return(
        <FlatList
            data={products}
            keyExtractor={item=>item.id}
            renderItem={productItem=><ProductItem
                                        title={productItem.item.title}
                                        price={productItem.item.price}
                                        image={productItem.item.image}
                                        onViewDetails={()=>
                                            props.navigation.navigate("ProductDetails",{productId:productItem.item.id,productTitle:productItem.item.title})}
                                        onAddToCart={()=>{
                                            dispatch(cartAction.addToCart(productItem.item))
                                        }}
                                        />}
    />)
}

ProductOverviewScreen.navigationOptions=navigationData=>{
    return {
        title:"All Products",
        headerRight:()=><HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                    title='cart'
                    iconName='md-cart'
                    onPress={()=>{
                        navigationData.navigation.navigate('Cart')
                    }}
                />
            </HeaderButtons>
    }
}

const styles=StyleSheet.create({
    container:{
        width:'100%',
    },
    containerItem:{
        width:'90%',
        height:300,
        borderColor:'black',
        borderWidth:1,
        marginHorizontal:20,
        marginVertical:10
    },
    imageContainer:{
        width:'100%',
        height:'70%',
        justifyContent:'center',
        alignItems:'center'
    },
    image:{
        width:'90%',
        height:'90%',
        marginHorizontal:10,
        paddingVertical:10
    },
    title:{
        fontSize:20,
        fontWeight:'bold',
        textAlign:'center'
    },
    price:{
        fontSize:16,
        fontWeight:"800",
        textAlign:'center',
        color:"#4a0803"
    },
    buttonContainer:{
        flexDirection:'row',
        justifyContent:'space-around'
    },
    button:{
        color:'#4a0803',
        width:150
    }

})
export default ProductOverviewScreen;