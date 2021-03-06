import React from 'react';
import {FlatList,Button,StyleSheet,Alert} from 'react-native';
import {useSelector,useDispatch } from 'react-redux';
import {HeaderButtons,Item} from 'react-navigation-header-buttons';

import HeaderButton from '../../components/UI/HeaderButton';
import ProductItem from '../../components/ProductItem';
import * as productActions from '../../store/action/product';

const UserProductScreen = props =>{
    const products=useSelector(state=>state.products.userProducts);
    const dispatch=useDispatch();

    const editProductHandler=(id)=>{
        props.navigation.navigate('EditProduct',{productId:id})
    }
    const deleteHandler=(id)=>{
        Alert.alert("Are you sure","Do you really want to delete this item",
        [
            {text:'No',style:'default'}
            ,{text:'Yes',style:'destructive',onPress:()=>{
                dispatch(productActions.deleteProduct(id))
            }}
        ])
    }
    return(
        <FlatList
            data={products}
            keyExtractor={item=>item.id}
            renderItem={productItem=><ProductItem
                title={productItem.item.title}
                price={productItem.item.price}
                image={productItem.item.image}
                onSelect={()=>{editProductHandler(productItem.item.id)}}
                >
                <Button style={styles.button} 
                    title="Edit" 
                    onPress={()=>{editProductHandler(productItem.item.id)}}/>
                <Button style={styles.button} 
                    title="Delete"
                    onPress={deleteHandler.bind(this,productItem.item.id)}/>
                </ProductItem>
            }
        />
    )
}
UserProductScreen.navigationOptions=navigationData=>{
    return {
        title:"Yours Products",
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
            title='Add'
            iconName='md-create'
            onPress={()=>{
                navigationData.navigation.navigate('EditProduct')
            }}
        />
    </HeaderButtons>,
    }
}

const styles=StyleSheet.create({
    // container:{
    //     width:'100%',
    // },
    // containerItem:{
    //     width:'90%',
    //     height:300,
    //     borderColor:'black',
    //     borderWidth:1,
    //     marginHorizontal:20,
    //     marginVertical:10
    // },
    // imageViewContainer:{
    //     width:'100%',
    //     height:'70%',   
    // },
    // imageContainer:{
    //     width:'95%',
    //     height:'95%',
    //     justifyContent:'center',
    //     alignItems:'center',
    //     marginHorizontal:10,
    //     marginVertical:10
    // },
    // image:{
    //     width:'100%',
    //     height:'100%',
    //     // marginHorizontal:10,
    //     // paddingVertical:10
    // },
    // title:{
    //     fontSize:20,
    //     fontWeight:'bold',
    //     textAlign:'center'
    // },
    // price:{
    //     fontSize:16,
    //     fontWeight:"800",
    //     textAlign:'center',
    //     color:"#4a0803"
    // },
    // buttonContainer:{
    //     flexDirection:'row',
    //     justifyContent:'space-around'
    // },
    button:{
        color:'#4a0803',
        width:150
    }
})
export default UserProductScreen;