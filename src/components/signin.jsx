import React, { useEffect, useState } from "react";
import {auth,provider} from "../firebaseconfig";
import {signInWithPopup} from "firebase/auth";
import InventoryPage from "../pages/inventory";



function SignIn(){
    const [value,setValue] = useState('')
    const handleClick =()=>{
        signInWithPopup(auth,provider).then((data)=>{
            setValue(data.user.email)
            localStorage.setItem("email",data.user.email)
        })
    }
    useEffect(()=>{
        setValue(localStorage.getItem('email'))
    })

return (
    <div>
        {value?<InventoryPage/>:
        <button onClick={handleClick}>Sign in With Google</button>
        }
    </div>
);
}
export default SignIn;