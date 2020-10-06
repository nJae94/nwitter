import React from 'react';
import { authService, firebaseInstance } from "fbase";
import AuthForm from 'components/AuthForm';


const Auth = () => {

    const onSocialClick = async (event) => {

          const provider = new firebaseInstance.auth.GoogleAuthProvider();

          console.log(provider);

          await authService.signInWithPopup(provider);

    };


  

    return (
        <div>
            <AuthForm />
            <div>
                <button onClick={onSocialClick} name="google">With Google</button>
            </div>
        </div>
    )
}

export default Auth;