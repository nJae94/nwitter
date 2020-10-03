import { dbService, storageService } from 'fbase';
import React, { useEffect, useState } from 'react'

function Nweet({nweetObj, isOwner}) {

    const [editing, setEditing] = useState(false);

    const [newText, setNewText] = useState(nweetObj.text);

 const onDeleteClick = async() => {

    const ok = window.confirm("삭제 하시겠습니까?");

    if(ok)
    {
       await dbService.doc(`nweets/${nweetObj.id}`).delete();
       await storageService.refFromURL(nweetObj.fileUrl).delete();
    }
 };

 const toggleEditing = () => setEditing((prev)=> !prev);

 const onSubmit = async (e)=>{

     e.preventDefault();

    await dbService.doc(`nweets/${nweetObj.id}`).update({
        text: newText,
    });

    setEditing(false);

 }

 const onChange = (e) => 
 {
     const {target:{value},
    } = e;

    setNewText(value);
 }
    return (
        <div>
           {
           editing ? 
           <form onSubmit={onSubmit}>
               <input value={newText} placeholder="글 수정" onChange={onChange} required />
               <button onClick={toggleEditing} >Cancle</button>

               <input type="submit" value="수정" />
           </form>
            :
            <>
                <h4>{nweetObj.text}</h4>
                {nweetObj.fileUrl && <img src={nweetObj.fileUrl} width="50px" height="50px" />}
                {isOwner && 
                (
                    <>
                        <button onClick={onDeleteClick}>Delete</button>
                        <button onClick={toggleEditing}>Edit</button>
                    </>
                )}   
            </>
        }
            
        </div>
    )
}

export default Nweet
