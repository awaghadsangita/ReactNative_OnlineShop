import React,{useState, useCallback, useEffect,useReducer} from 'react';
import {View,Text,StyleSheet,TextInput,ScrollView, Alert} from 'react-native';
import {useSelector,useDispatch} from 'react-redux';
import {HeaderButtons,Item} from 'react-navigation-header-buttons';

import HeaderButton from '../../components/UI/HeaderButton';
import * as productActions from '../../store/action/product';

const FORM_INPUT_UPDATE='FORM_INPUT_UPDATE'
const formReducer=(state,action)=>{
    if(action.type===FORM_INPUT_UPDATE){
        const updatedValues ={
            ...state.inputValues,
            [action.input]:action.value
        }
        const updatedValidities={
            ...state.updatedValidities,
            [action.input]:action.isValid
        }
        let updatedFormIsValid=true;
        for(const key in updatedValidities){
            updatedFormIsValid:updatedFormIsValid && updatedValidities[key]
        }
        return{
            formIsValid:updatedFormIsValid,
            inputValidities:updatedValidities,
            inputValues:updatedValues
        }
    }
    return state;
}
const EditProductScreen =props=>{
    const prodId=props.navigation.getParam('productId')
    const editedProduct=useSelector(state=>
        state.products.userProducts.find(prod=>prod.id==prodId));

    const dispatch=useDispatch();
    const [formState,dispatchFormState]=useReducer(formReducer,{
        inputValues:{
            title:editedProduct?editedProduct.title:'',
            image:editedProduct?editedProduct.image:'',
            description:editedProduct?editedProduct.description:'',
            price:''  
        },
        inputValidities:{
            title:editedProduct?true:false,
            image:editedProduct?true:false,
            description:editedProduct?true:false,
            price:editedProduct?true:false
        },
        formIsValid:editedProduct?true:false
    })
    const textChangeHandler=(inputTextHandler,text)=>{
        let isValid=false;
        if(text.trim().length===0){
            isValid=true;
        }
        dispatchFormState({
            type:FORM_INPUT_UPDATE,
            value:text,
            isValid:isValid,
            input:inputTextHandler
        })
    }
    const submitHandler=useCallback(()=>{
        if(!formState.formIsValid){
            Alert.alert("wrong input","Please check the errors in the form",[
                {text:'Okay'}
            ]);
            return;
        }
        if(editedProduct){
            dispatch(productActions.updateProduct(editedProduct.id,
                formState.inputValues.title,
                formState.inputValues.description,
                formState.inputValues.image.toString()))
        }else{
            console.log("Edit",image);
            dispatch(productActions.createProduct(
                formState.inputValues.title,
                formState.inputValues.description,
                formState.inputValues.image.toString(),
                +formState.inputValues.price))
        }
        props.navigation.goBack();
    },[dispatch,formState]);

    useEffect(()=>{
        props.navigation.setParams({submit:submitHandler})
    },[submitHandler])

    return(
        <ScrollView>
            <View style={styles.form}>
                <View style={styles.formControl}>
                    <Text style={styles.lable}>Title</Text>
                    <TextInput 
                        style={styles.input}
                        value={formState.inputValues.title}
                        onChangeText={textChangeHandler.bind(this,'title')}
                        keyboardType="default"
                        autoCapitalize="sentences"
                        autoCorrect
                        returnKeyType="next"
                    />
                </View>
                <View style={styles.formControl}>
                    <Text style={styles.lable}>Image Url</Text>
                    <TextInput 
                        style={styles.input}
                        value={formState.inputValues.image}
                        onChangeText={textChangeHandler.bind(this,'image')}
                        keyboardType="default"
                        autoCorrect
                        returnKeyType="next"
                    />
                </View>
               {!prodId && <View style={styles.formControl}>
                    <Text style={styles.lable}>Price</Text>
                    <TextInput 
                        style={styles.input}
                        value={+formState.inputValues.price}
                        onChangeText={textChangeHandler.bind(this,'price')}
                        keyboardType="decimal-pad"
                        returnKeyType="next"
                        />
                </View>}
                <View style={styles.formControl}>
                    <Text style={styles.lable}>Description</Text>
                    <TextInput 
                        style={styles.input}
                        value={formState.inputValues.description}
                        onChangeText={textChangeHandler.bind(this,'description')}
                        keyboardType="default"
                        autoCapitalize="sentences"
                        autoCorrect
                        returnKeyType="next"
                        />
                </View>
            </View>
            
        </ScrollView>
        
    )
}
EditProductScreen.navigationOptions=navigationData=>{
    const productId=navigationData.navigation.getParam('productId');
    const submitFunction=navigationData.navigation.getParam('submit');
     return {
            title:productId?"Edit Product":"Add Product",
            headerRight:()=><HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item
                title='save'
                iconName='md-checkmark'
                onPress={submitFunction}
            />
        </HeaderButtons>,
        } 
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