import { dbService, storageService } from 'fbase';
import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";

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
        <div className="nweet">
           {
           editing ? 
          ( <>
               <form onSubmit={onSubmit} className="container nweetEdit">
               <input value={newText} placeholder="글 수정" onChange={onChange} autoFocus className="formInput" required />
              
               <input type="submit" value="수정" className="formBtn"  />
               </form>
               <span onClick={toggleEditing} className="formBtn cancelBtn">
                    Cancel
                </span>
           </>
           )
            :
            <>
                <h4>{nweetObj.text}</h4>
                {nweetObj.fileUrl && <img src={nweetObj.fileUrl} />}
                {isOwner && 
                (
                    <>
                        <div class="nweet__actions">
                        <span onClick={onDeleteClick}>
                            <FontAwesomeIcon icon={faTrash} />
                        </span>
                        <span onClick={toggleEditing}>
                            <FontAwesomeIcon icon={faPencilAlt} />
                        </span>
                        </div>
                    </>
                )}   
            </>
        }
            
        </div>
    )
}

export default Nweet
