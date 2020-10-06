
import React, { useEffect, useState } from 'react';
import { dbService } from 'fbase';
import Nweet from './Nweet';
import NweetFactory from 'components/NweetFactory';

const Home = ({userObj}) => {

    const [nweet, setNweet] = useState("");

    const [nweets, setNweets] = useState([]);

    const [file, setFile] = useState("");

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

    return (
        <div>
            <NweetFactory userObj={userObj} />
            <div>
                {nweets.length >0 && nweets.map(n => 
                    <Nweet key={n.id} nweetObj={n} isOwner={n.creatorId === userObj.uid} />
                    ) }
            </div>
        </div>
    )
}

export default Home;