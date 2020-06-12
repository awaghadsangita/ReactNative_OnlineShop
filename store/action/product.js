import Product from '../../model/Product';
export const DELETE_PRODUCT='DELETE_PRODUCT';
export const CREATE_PRODUCT='CREATE_PRODUCT';
export const UPDATE_PRODUCT='UPDATE_PRODUCT';
export const SET_PRODUCT="SET_PRODUCT";

 
export const fetchProduct=()=>{
    return async dispatch=>{
    const response= await fetch("https://recipewebsite-95fbf.firebaseio.com/Products.json")
    const resData=await response.json();
    const loadedProducts=[];
    for(const key in resData){
        loadedProducts.push(
            new Product(
                key,
                "u1",
                resData[key].title,
                resData[key].image,
                resData[key].description,
                resData[key].price))
    }
    dispatch({type:SET_PRODUCT,products:loadedProducts})
}
}
export const deleteProduct=productId=>{
    return {type:DELETE_PRODUCT,pid:productId}
}

export const createProduct=(title,description,image,price)=>{
    return async dispatch=>{
        const response= await fetch("https://recipewebsite-95fbf.firebaseio.com/Products.json",{
            method:'POST',
            header:{
                'content-type':'application/json'
            },
            body:JSON.stringify({
                title,
                description,
                image,
                price
            })
        })
        const resData=await response.json();
        console.log(resData)
        dispatch({
            type:CREATE_PRODUCT,
            productData:{
                id:resData.name,
                title,
                description,
                image,
                price,
        }})
    }
}

export const updateProduct=(id,title,description,image)=>{
    return {
        type:UPDATE_PRODUCT,
        pid:id,
        productData:{
            title,
            description,
            image:image.toString()
        }
    }
}