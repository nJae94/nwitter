import React, { useState } from 'react';
import fbase from '../fbase';

const Auth = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newAccount, setNewAccount] = useState(true);

    const authService = fbase.auth();
 
    const onChange = (e) => {

        const {target: {
            name,value
        }} = e;

        if(name === 'email')
        {
            setEmail(value);
        }
        else{
            setPassword(value);
        }

    }

    const onSubmit = async(e) => {

        e.preventDefault();
        let data;
        try{

            if(newAccount){

                data = await authService.createUserWithEmailAndPassword(
                     email, password
                 )
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
        }

    }
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
            </form>

            <div>
                <button>With Google</button>
            </div>
        </div>
    )
}

export default Auth;