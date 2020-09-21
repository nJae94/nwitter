import React, { useState } from 'react';
import { authService, firebaseInstance } from "fbase";


const Auth = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newAccount, setNewAccount] = useState(true);
    const [error, setError] = useState("");
 
    const onChange = (e) => {

        const {target: {
            name,value
        }} = e;

        if(name === 'email')
        {
            setEmail(value);
        }
        else if(name==='password'){
            setPassword(value);
        }

    }

    const onSocialClick = async (event) => {

          const provider = new firebaseInstance.auth.GoogleAuthProvider();

          console.log(provider);

          await authService.signInWithPopup(provider);

    };


    const onSubmit = async(e) => {

        e.preventDefault();

        try{

            let data;

            if(newAccount){

                console.log(email,password);

                data = await authService.createUserWithEmailAndPassword(
                     email, password
                 );
             }
             else
             {

                data = await authService.signInWithEmailAndPassword(email,password);
             }

             console.log(data);
        }
        
        catch(error)
        {
        
            console.log(error);
            setError(error.message);
        }

    };

    const toggleAccount = () => setNewAccount((prev) => !prev);

    return (
        <div>
            <form onSubmit={onSubmit}>
                <input name ='email'
                type='text'
                placeholder="Email" 
                required 
                value={email}
                onChange={onChange}
                />

                <input 
                name = 'password' 
                type='password' 
                placeholder="password" 
                required 
                value={password} 
                onChange={onChange}
                />
                <input type="submit" value={newAccount ? "Create Account": "Log In"}/>
                {error}
            </form>
            <span onClick={toggleAccount}>
                {newAccount ? "Sign In" : "Create Account"}
            </span>

            <div>
                <button onClick={onSocialClick} name="google">With Google</button>
            </div>
        </div>
    )
}

export default Auth;