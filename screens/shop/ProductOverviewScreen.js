import React, { useEffect } from 'react';
import {FlatList,Button,StyleSheet} from 'react-native';
import {useSelector,useDispatch} from 'react-redux';
import {HeaderButtons,Item} from 'react-navigation-header-buttons';

import ProductItem from '../../components/ProductItem'
import * as cartAction from '../../store/action/cart';
import HeaderButton from '../../components/UI/HeaderButton';
import * as productAction from '../../store/action/product';

const ProductOverviewScreen =props=>{
    const products=useSelector(state=>state.products.availableProducts);
    const dispatch=useDispatch()

    const selectItemHandler= (id,title)=>{
        props.navigation.navigate('ProductDetails',{
            productId:id,
            productTitle:title
        })
    }
    useEffect(()=>{
        dispatch(productAction.fetchProduct())
    },[dispatch])
    return(
        <FlatList
            data={products}
            keyExtractor={item=>item.id}
            renderItem={productItem=><ProductItem
                                        title={productItem.item.title}
                                        price={productItem.item.price}
                                        image={productItem.item.image}
                                        onSelect={()=>
                                            selectItemHandler(productItem.item.id,productItem.item.title)
                                        }
                                        >
                                        <Button style={styles.button} 
                                            title="View Details" 
                                            onPress={()=>selectItemHandler(productItem.item.id,productItem.item.title)}/>
                                        <Button style={styles.button} 
                                            title="Add To Cart"
                                            onPress={()=>{dispatch(cartAction.addToCart(productItem.item))}}/>
                                        </ProductItem>
                                        }
    />)
}

ProductOverviewScreen.navigationOptions=navigationData=>{
    return {
        title:"All Products",
        headerLeft:()=><HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                    title='menu'
                    iconName='md-menu'
                    onPress={()=>{
                        navigationData.navigation.toggleDrawer()
                    }}
                />
            </HeaderButtons>,
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
        width:170
    }

})
export default ProductOverviewScreen;