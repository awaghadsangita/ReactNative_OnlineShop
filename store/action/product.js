export const DELETE_PRODUCT='DELETE_PRODUCT';
export const CREATE_PRODUCT='CREATE_PRODUCT';
export const UPDATE_PRODUCT='UPDATE_PRODUCT';

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