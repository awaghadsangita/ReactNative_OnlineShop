import PRODUCTS from '../../data/Dummay-Data';
import Product from '../../model/Product';
import {DELETE_PRODUCT,CREATE_PRODUCT,UPDATE_PRODUCT,SET_PRODUCT} from '../action/product';

const initialState={
    availableProducts:PRODUCTS,
    userProducts:PRODUCTS.filter(product=>product.ownerId=='u1')
}

export default (state=initialState,action)=>{
    switch(action.type){
        case SET_PRODUCT:{
            return{
                availableProducts:action.products,
                userProducts:action.products.filter(product=>product.ownerId=='u1')
            }
        }//end set product case
        case DELETE_PRODUCT:{
            return {
                ...state,
                userProducts: state.userProducts.filter(product=>product.id!==action.pid),
                availableProducts: state.availableProducts.filter(product=>product.id!==action.pid),
            }
        }//end delete product case
        case CREATE_PRODUCT:{
            const newProduct=new Product(
                action.productData.id,
                'u1',
                action.productData.title,
                action.productDate.image.toString(),
                action.productData.description,
                action.productData.price
            )
            return{
                ...state,
                userProducts:state.userProducts.concat(newProduct),
                availableProducts:state.availableProducts.concat(newProduct),
                
            }
        }//end create product case
        case UPDATE_PRODUCT:{
            console.log(action)
            const productIndex=state.userProducts.findIndex(prod=>prod.id==action.pid);
            const updatedProduct=new Product(
                action.pid,
                state.userProducts[productIndex].ownerId,
                action.productData.title,
                action.productData.image,
                action.productData.description,
                state.userProducts[productIndex].price
            )
            const updatedUserProduct=[...state.userProducts];
            updatedUserProduct[productIndex]=updatedProduct;

            const updatedAvailableProduct=[...state.availableProducts];
            updatedAvailableProduct[productIndex]=updatedProduct;

            return{
                ...state,
                userProducts:updatedUserProduct,
                availableProducts:updatedAvailableProduct,
            }

        }//end update product case
    }
    return state;
}