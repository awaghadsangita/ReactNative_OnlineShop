import React from 'react';
import {View,Text,StyleSheet,TouchableOpacity} from 'react-native';
import {Ionicons} from '@expo/vector-icons'
const CartItem = props =>{

    return(
        <View>
            <View style={styles.container}>
                <Text style={styles.title}>{props.title}</Text>
                <Text style={styles.qty}>Qty:{props.quantity}</Text>
            </View>
            <View style={styles.container}>
                <Text styel={styles.total}>Total:{props.sum}</Text>
                {props.deletable && <TouchableOpacity onPress={props.onRemove}>
                    <Ionicons
                        name='md-trash'
                        size={23}
                        color='red'
                    />
                </TouchableOpacity>}
            </View>
            
        </View>
    )
}

const styles=StyleSheet.create({
    container:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    },
    title:{
        fontSize:18,
        fontWeight:'bold'
    },
    qty:{
        fontSize:16,
        fontWeight:'bold',
        color:'#4a0803'
    },
    total:{
        fontSize:18,
        fontWeight:'bold',
        color:'#4a0803'
    }
})

export default CartItem;