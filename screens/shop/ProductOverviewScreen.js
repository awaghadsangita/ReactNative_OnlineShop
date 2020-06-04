import React from 'react';
import {FlatList,StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';

import ProductItem from '../../components/ProductItem'
const ProductOverviewScreen =props=>{
    const products=useSelector(state=>state.products.availableProducts)
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
                                        />}
    />)
}

ProductOverviewScreen.navigationOptions=()=>{
    return {title:"All Products"}
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