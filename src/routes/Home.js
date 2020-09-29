
import React, { useEffect, useState } from 'react';
import { dbService } from 'fbase';
import Nweet from './Nweet';

const Home = ({userObj}) => {

    const [nweet, setNweet] = useState("");

    const [nweets, setNweets] = useState([]);

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

    return (
        <div>
            <form onSubmit={onSubmit}>
                <input value={nweet} onChange={onChange} type="text" placeholder="쓸 말" maxLength={120} />
                <input type="submit" value="Nweet" />
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