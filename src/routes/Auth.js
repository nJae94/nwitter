import React from 'react';
import { authService, firebaseInstance } from "fbase";
import AuthForm from 'components/AuthForm';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTwitter,
  faGoogle,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";


const Auth = () => {

    const onSocialClick = async (event) => {

          const provider = new firebaseInstance.auth.GoogleAuthProvider();

          console.log(provider);

          await authService.signInWithPopup(provider);

    };

    return (
        <div className="authContainer">
            <FontAwesomeIcon
                icon={faTwitter}
                color={"#04AAFF"}
                size="3x"
                style={{ marginBottom: 30 }}
            />
            <AuthForm />
            <div className="authBtns">
                <button onClick={onSocialClick} name="google" className="authBtn">
                Continue with Google <FontAwesomeIcon icon={faGoogle} />
                </button>
            </div>
        </div>
    )
}

export default Auth;