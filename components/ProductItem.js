import React from 'react';
import {
    Text,
    View,
    StyleSheet,
    Image, 
    TouchableOpacity
} from 'react-native';

const productItem=props=>{
    return(
        <View style={styles.container}>
        <View style={styles.containerItem}>
            <TouchableOpacity style={styles.imageViewContainer} 
                opPress={props.onSelect}>
            <View style={styles.imageContainer}>
                <Image style={styles.image} source={{uri:props.image}}/>
            </View>
            </TouchableOpacity>
            <View>
            <Text style={styles.title}>{props.title}</Text>
            <Text style={styles.price}>${props.price}</Text>
            </View>
            <View style={styles.buttonContainer}>
            {props.children}
            </View>
            
        </View>
        </View>
    );

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
        marginVertical:10,
    },
    imageViewContainer:{
        width:'100%',
        height:'70%',   
    },
    imageContainer:{
        width:'95%',
        height:'95%',
        justifyContent:'center',
        alignItems:'center',
        marginHorizontal:10,
        marginVertical:10
    },
    image:{
        width:'100%',
        height:'100%',
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
        justifyContent:'space-around',
        paddingBottom:20
    },
    
})
export default productItem;