import React,{useState} from 'react';
import {View,Text,StyleSheet,Button} from 'react-native';
import CartItem from '../components/CartItem';

const OrderItem =props=>{
    const [showDetails,setShowDetails]=useState(false);
    console.log("===>",props)

    return (<View style={styles.container}>
            <View style={styles.summary}>
                <Text style={styles.totalAmt}>{props.totalAmount}</Text>
                <Text style={styles.totalAmt}>{props.date.toString()}</Text>
            </View>
            <Button style={styles.button} 
                title={showDetails?"hide Details":"Show Details"}
                onPress={()=>{
                    setShowDetails(prevState=>!prevState);
                }}/>
            {showDetails && (
        <View style={styles.detailItems}>
          {props.items.map(cartItem => (
            <CartItem
              key={cartItem.productId}
              quantity={cartItem.quantity}
              sum={cartItem.sum}
              title={cartItem.productTitle}
            />
          ))}
        </View>
      )}
</View>  )
        

}
const styles=StyleSheet.create({
    container:{
        width:'90%',
        margin:20,
        padding:10,
        borderColor:'black',
        borderRadius:10,
        borderWidth:1
    },
    summary:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    },
    totalAmt:{
        fontSize:18,
        fontWeight:'bold',
        color:"#4a0803"
    },
    dateText:{
        fontSize:18,
        fontWeight:'bold',
        color:"#4a0803"
    },
    button:{
        width:'40%',
    }

})

export default OrderItem;