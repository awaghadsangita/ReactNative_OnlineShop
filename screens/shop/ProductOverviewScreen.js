import React from 'react';
import {FlatList,Text,View,StyleSheet,Image, Button} from 'react-native';
import {useSelector} from 'react-redux';


const ProductOverviewScreen =props=>{
    const products=useSelector(state=>state.products.availableProducts)
    const productItem=itemData=>{
        return(
            <View style={styles.container}>
            <View style={styles.containerItem}>
                <View style={styles.imageContainer}>
                    <Image style={styles.image} source={{uri:itemData.item.image}}/>
                </View>
                <View>
                <Text style={styles.title}>{itemData.item.title}</Text>
                <Text style={styles.price}>${itemData.item.price}</Text>
                </View>
                <View style={styles.buttonContainer}>
                <Button style={styles.button} title="View Details"/>
                <Button style={styles.button} title="Add To Cart"/>
                </View>
            </View>
            </View>
        );

    }
    return(
        <FlatList
            data={products}
            keyExtractor={item=>item.id}
            renderItem={productItem}
        />
    )
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