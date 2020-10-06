import { dbService, storageService } from 'fbase';
import React, { useState } from 'react'
import {v4 as uuidv4} from 'uuid';

function NweetFactory({userObj}) {

    const [nweet, setNweet] = useState("");

    const [file, setFile] = useState("");

    const onSubmit = async (event) => {

        event.preventDefault();

        let fileUrl = "";

        if(file !== "")
        {
            const fileRef = storageService.ref().child(`${userObj.uid}/${uuidv4()}`);

            const response =  await fileRef.putString(file,"data_url");
            
            fileUrl = await response.ref.getDownloadURL();
        }


        const fullNweet = {

            text: nweet,
            createdAt:Date.now(),
            creatorId: userObj.uid,
            fileUrl

        }

        await dbService.collection("nweets").add(fullNweet);

        setNweet("");

    };

    const onChange = (event) => {

        const {target: {value},} = event;

        setNweet(value);

    }
    const onFileChange = (e) => {
        const {
            target: {
                files
            },
        } = e;

        const theFile = files[0];

        const reader = new FileReader();

        reader.onloadend = (finishedEvent) =>{

            const {
                currentTarget: {result},
            } = finishedEvent;

            setFile(result);
        };

        reader.readAsDataURL(theFile);

        
    };

    const onClearPhoto = () => {
        setFile(null);
    }
    return (
        <form onSubmit={onSubmit}>
                <input value={nweet} onChange={onChange} type="text" placeholder="쓸 말" maxLength={120} />
               
               <input type="file" accept="image/*" onChange={onFileChange}/>
               
                <input type="submit" value="Nweet" />

               { file && 
               <div>
                   <img src={file} width="50px" height="50px" />
                   <button onClick={onClearPhoto}>Clear</button>
               </div>
               
               }
            </form>
    )
}

export default NweetFactory
