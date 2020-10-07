import { authService, dbService } from 'fbase'
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

function Profile({refreshUser, userObj}) {

    const history = useHistory();
    const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);

    const onLogOutClick = () => {

        authService.signOut();

        history.push("/");

        refreshUser();
        
    }

    const onChange = (e) => {

        const {
            target: {
                value,
            }
        } = e;

        setNewDisplayName(value);

    }

    const getMyNweets = async() => {

        const nweets = await dbService
                            .collection("nweets")
                            .where("creatorId","==", userObj.uid)
                            .orderBy("createdAt")
                            .get();

        console.log(nweets.docs.map((doc)=> doc.data()));

    }

    useEffect(()=> {
        getMyNweets();
    });
    
    const onSubmit = async (e) => {
        e.preventDefault();

        if(userObj.displayName !== newDisplayName){
           await userObj.updateProfile({
                displayName: newDisplayName,
            });

            refreshUser();
        }
    }

    return (
        <div className="container">
            <form onSubmit={onSubmit}  className="profileForm">
                <input
                onChange={onChange}
                 type="text" 
                 placeholder="Display Name" 
                 value={newDisplayName}
                 className="formInput"
                 />
                <input type="submit" value="Update Profile"  className="formBtn"
                    style={{
                        marginTop: 10,
                    }} />
            </form>
            <span className="formBtn cancelBtn logOut" onClick={onLogOutClick}>
                Log Out
            </span>
        </div>
    )
}

export default Profile
