import React,{useState,useEffect,useReducer,useCallback} from 'react';
import {View,StyleSheet,ScrollView,Button,ActivityIndicator, Alert} from 'react-native';
import {useDispatch} from 'react-redux';

import Input from '../../components/UI/Input';
import * as authActions from '../../store/action/auth';
const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

const formReducer = (state, action) => {
  if (action.type === FORM_INPUT_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value
    };
    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid
    };
    let updatedFormIsValid = true;
    for (const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
    }
    return {
      formIsValid: updatedFormIsValid,
      inputValidities: updatedValidities,
      inputValues: updatedValues
    };
  }
  return state;
};
const AuthScreen=props=>{
    const [isSignUp,setIsSignUp]=useState(false)
    const [isLoading,setIsLoading]=useState(false);
    const [isError,setIsError]=useState(null);
    const dispatch = useDispatch();
  
    const [formState, dispatchFormState] = useReducer(formReducer, {
      inputValues: {
        email:'',
        password:''
      },
      inputValidities: {
        email:false,
        password:false
      },
      formIsValid: false
    });
    useEffect(()=>{
        if(isError){
            Alert.alert("Error Occured!",isError,[{text:"Okay"}])
        }
    },[isError])
    const submitHandler = useCallback(async () => {
      let action;
    if (isSignUp) {
          authActions.signUp(
            formState.inputValues.email,
            formState.inputValues.password
          )
      } else {
        action=authActions.login(
            formState.inputValues.email,
            formState.inputValues.password
          )
        }
        setIsError(null)
      setIsLoading(true);  
      try{
        await dispatch(action)
      }catch(err){
          setIsError(err.message)
      }
      setIsLoading(false)
    }, [dispatch,formState]);
  
    const inputChangeHandler = useCallback(
      (inputIdentifier, inputValue, inputValidity) => {
        dispatchFormState({
          type: FORM_INPUT_UPDATE,
          value: inputValue,
          isValid: inputValidity,
          input: inputIdentifier
        });
      },
      [dispatchFormState]
    );
    return (
        <View style={styles.container}>
    <ScrollView style={styles.componentContainer}>
        
        <Input
            id="email"
            lable="Email"
            errorText="Invalid Username"
            autoCapitalize="none"
            keyboardType="default"
            returnKeyType="next"
            required
            email
            onInputChange={inputChangeHandler}   
        />
        <Input
            id="password"
            lable="Password"
            errorText="Invalid password"
            keyboardType="default"
            autoCapitalize="none"
            secureTextEntry
            minLength={5}
            onInputChange={inputChangeHandler}   
        />
        <View style={styles.buttonContainer}>
            { isLoading? <ActivityIndicator size="large" color="#0000ff" />:
            <Button title={`${isSignUp? "sign up":"login"}`} onPress={submitHandler}/>
    }
        </View>
        <View style={styles.buttonContainer}> 
            <Button title={`Switch to ${isSignUp?"Login":"SignUp"}`} onPress={()=>{setIsSignUp(prev=>!prev)}}/>
        </View>
    
    </ScrollView>
    </View>
    )
}
AuthScreen.navigationOptions=()=>{
    return{
        title:"Authentication"
    }
}
const styles=StyleSheet.create({
    componentContainer:{
        flex:1,
        width:'90%',
        marginHorizontal:20,
    },
    container:{
        flex:1,
        width:'100%',
        justifyContent:"center",
        alignItems:"center",
    },
    buttonContainer:{
        marginTop:10
    }
});

export default AuthScreen;
