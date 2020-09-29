import React, { useEffect } from 'react'

function Nweet({nweetObj, isOwner}) {

    useEffect(()=>{

        let test = document.documentElement.scrollHeight;

        console.log(test);
    
    },[]);
    return (
        <div>
            <h4>{nweetObj.text}</h4>

            {isOwner && 
            (
                <>
                    <button>Delete</button>
                    <button>Edit</button>
                </>
            )}
            
        </div>
    )
}

export default Nweet
