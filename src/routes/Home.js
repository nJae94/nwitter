
import React, { useEffect, useState } from 'react';
import { dbService } from 'fbase';
import Nweet from './Nweet';

const Home = ({userObj}) => {

    const [nweet, setNweet] = useState("");

    const [nweets, setNweets] = useState([]);

    const [file, setFile] = useState();

    // const getNweets = async () => {

    //   const dbNweets = await dbService.collection("nweets").get();
    //   dbNweets.forEach((document) => {
    //     const nweetObject = {
    //       ...document.data(),
    //       id: document.id,
    //     };
    //     setNweets((prev) => [nweetObject, ...prev]);
    //   });
      
    // };

    useEffect(() => {
    //  getNweets();

      dbService.collection("nweets").onSnapshot(snapshot => {

        const nweetArray = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));

        setNweets(nweetArray);

      });

    }, []);


    const onSubmit = (event) => {

        event.preventDefault();

        dbService.collection("nweets").add({
            text: nweet,
            createdAt:Date.now(),
            creatorId: userObj.uid,
            
        });
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
        <div>
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

            <div>
                {nweets.length >0 && nweets.map(n => 
                    <Nweet key={n.id} nweetObj={n} isOwner={n.creatorId === userObj.uid} />
                    ) }
            </div>
        </div>
    )
}

export default Home;