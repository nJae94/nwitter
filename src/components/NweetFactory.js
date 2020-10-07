import { dbService, storageService } from 'fbase';
import React, { useState } from 'react'
import {v4 as uuidv4} from 'uuid';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";

function NweetFactory({userObj}) {

    const [nweet, setNweet] = useState("");

    const [file, setFile] = useState("");

    const onSubmit = async (event) => {

        if (nweet === "") {
            return;
          }

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
        setFile("");
    }
    return (
                   <form onSubmit={onSubmit} className="factoryForm">
                        <div className="factoryInput__container">
                            <input
                            className="factoryInput__input"
                            value={nweet}
                            onChange={onChange}
                            type="text"
                            placeholder="What's on your mind?"
                            maxLength={120}
                            />
                            <input type="submit" value="&rarr;" className="factoryInput__arrow" />
                        </div>
                        <label for="attach-file" className="factoryInput__label">
                            <span>Add photos</span>
                            <FontAwesomeIcon icon={faPlus} />
                        </label>
                        <input id="attach-file"
                            type="file"
                            accept="image/*"
                            onChange={onFileChange}
                            style={{
                            opacity: 0,
                            }}/>
               { file && 
               (
               <div className="factoryForm__attachment">
                   <img src={file} style={{
                        backgroundImage: file,
                    }} />
                   <div className="factoryForm__clear" onClick={onClearPhoto}>Clear
                   <span>Remove</span>
                         <FontAwesomeIcon icon={faTimes} />
                   </div>
               </div>
               
               )}

            </form>
    );
};

export default NweetFactory
