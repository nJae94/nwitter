import { authService } from 'fbase'
import React from 'react'
import { useHistory } from 'react-router-dom';

function Profile() {

    const history = useHistory();

    const onLogOutClick = () => {

        authService.signOut();

        history.push("/");
    }
    return (
        <div>
            <button onClick={onLogOutClick}>Log Out</button>
        </div>
    )
}

export default Profile
