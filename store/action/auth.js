
export const SIGNUP='SIGNUP';
export const LOGIN='LOGIN'
export const signUp=(email,password)=>{
    return async dispatch=>{
        const response =await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB4-3oLff4X5887-vejKthz4J5JSr_4pJA
        `,{
            method:"POST",
            header:{
                'content-type':'application/json'
            },
            body:JSON.stringify({
                email:email,
                password:password,
                returnSecureToken:true
            })
        })
        if(!response.ok){
            let message="Something went wrong!!!";
            const errorData=await response.json();
            console.log(errorData);
            if(errorData.error.message=="EMAIL_EXISTS"){
                message="this email not found";
            }else if(errorData.error.message=="OPERATION_NOT_ALLOWED"){
                message="password is not valid"
            }
            throw new Error(message);
        }
        const resdata=await response.json();
        console.log(resdata);
        //dispatch({type:SIGNUP,data:{email:email,password}})
    }
}

export const login=(email,password)=>{
    return async dispatch=>{
        const response =await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB4-3oLff4X5887-vejKthz4J5JSr_4pJA
        `,{
            method:"POST",
            header:{
                'content-type':'application/json'
            },
            body:JSON.stringify({
                email:email,
                password:password,
                returnSecureToken:true
            })
        })
        if(!response.ok){
            let message="Something went wrong!!!";
            const errorData=await response.json();
            console.log(errorData);
            if(errorData.error.message=="EMAIL_NOT_FOUND"){
                message="this email not found";
            }else if(errorData.error.message=="INVALID_PASSWORD"){
                message="password is not valid"
            }
            throw new Error(message);
        }
        const resdata=await response.json();
        console.log(resdata);
        //dispatch({type:SIGNUP,data:{email:email,password}})
    }
}