import React from 'react';
import {View,Text,StyleSheet,Image, Button} from 'react-native';
import {useSelector} from 'react-redux';

const ProductDetailsScreen =props=>{
    const productId=props.navigation.getParam('productId');
    const product=useSelector(state=>state.products.availableProducts)
    const selectedProduct=product.filter(item=>item.id==productId)
    console.log(selectedProduct);
    return(
        <View style={styles.screen}>
            <View style={styles.imageContainer}>
                <Image style={styles.image} source={{uri:selectedProduct[0].image}}/>
            </View>
            <View style={styles.detailsContainer}>
                <Button color="#4a0803" title="ADD To Cart"/>
                <Text style={styles.price}>${selectedProduct[0].price}</Text>
                <Text style={styles.description}>{selectedProduct[0].description}</Text>
            </View>
        </View>
    )
}

ProductDetailsScreen.navigationOptions=navigationData=>{
    return {title:navigationData.navigation.getParam('productTitle')}
}

const styles=StyleSheet.create({
    screen:{
        flex:1
    },
    imageContainer:{
        width:'100%',
        height:300,
        justifyContent:'center',
        alignItems:'center'
    },
    image:{
        width:'90%',
        height:'90%',
        borderRadius:10
    },
    detailsContainer:{
        justifyContent:'center',
        alignItems:'center'
    },
    price:{
        fontSize:20,
        color:'#4a0803',
        fontWeight:"800",
        marginVertical:10
    },
    description:{
        fontSize:18,
        fontWeight:'700',
        marginHorizontal:10,
        textAlign:'center'

    }
})

export default ProductDetailsScreen;