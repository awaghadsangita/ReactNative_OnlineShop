import React,{useState} from 'react';
import {View,Text,StyleSheet,TextInput,ScrollView} from 'react-native';
import {useSelector} from 'react-redux';

const EditProductScreen =props=>{
    const prodId=props.navigation.getParam('productId')
    const editedProduct=useSelector(state=>
        state.products.userProducts.find(prod=>prod.id==prodId));

    const [title,setTitle]=useState(editedProduct?editedProduct.title:'')
    const [image,setImage]=useState(editedProduct?editedProduct.image:'')
    const [price,setPrice]=useState(editedProduct?editedProduct.price:'')
    const [description,setDescription]=useState(editedProduct?editedProduct.description:'')
    return(
        <ScrollView>
            <View style={styles.form}>
                <View style={styles.formControl}>
                    <Text style={styles.lable}>Title</Text>
                    <TextInput 
                        style={styles.input}
                        value={title}
                        onChangeText={text=>setTitle(text)}
                    />
                </View>
                <View style={styles.formControl}>
                    <Text style={styles.lable}>Image Url</Text>
                    <TextInput 
                        style={styles.input}
                        value={image}
                        onChangeText={text=>setImage(text)}
                    />
                </View>
                <View style={styles.formControl}>
                    <Text style={styles.lable}>Price</Text>
                    <TextInput 
                        style={styles.input}
                        value={price.toString()}
                        onChangeText={text=>setPrice(text)}
                        />
                </View>
                <View style={styles.formControl}>
                    <Text style={styles.lable}>Description</Text>
                    <TextInput 
                        style={styles.input}
                        value={description}
                        onChangeText={text=>setDescription(text)}
                        />
                </View>
            </View>
            
        </ScrollView>
        
    )
}
EditProductScreen.navigationOptions=navigationData=>{
    
}
const styles=StyleSheet.create({
    form:{
        margin:10
    },
    formControl:{
        width:'100%'
    },
    lable:{
        fontWeight:"bold",
        marginVertical:10
    },
    input:{
        borderBottomColor:'#ccc',
        borderBottomWidth:1

    }
});

export default EditProductScreen;