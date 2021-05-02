import React, { useEffect, useState } from 'react'
import { Avatar } from '@material-ui/core'
import './sidebarchat.css'
import { db } from './firebase';
import {Link} from 'react-router-dom'

function SidebarChat({id, roomname, openprompt}) {
    const [messages, setMessages] = useState([]);

    const openPrompt = () => {
        const value = prompt("Enter Room Name");
        
        db.collection('rooms').add({
            roomname : value
        })
    }

    useEffect(()=>{
        db.collection('rooms')
            .doc(id)
            .collection('messages')
            .orderBy("timestamp", "asc")
            .onSnapshot(snapshot =>{
                setMessages(snapshot.docs.map(doc => doc.data().message))
            })
    }, [id])

    return openprompt ? (
        <div className="sidebarchat">
            <button 
            style={{background: 'none',
                    fontSize: '14pt',
                    fontWeight: 'bold',
                    border: 'none',
                    outline: 'none',
                    cursor: 'pointer'}}
            onClick={openPrompt}
        >
            Add New Room
        </button>
        </div>
    ) : (
            <Link to={`/room/${id}`}>
            <div className="sidebarchat">
              <Avatar src=""/>
              <div className="sidebarchat__text">
                <div className="sidebarchat__text-name">
                    {roomname}
                </div>
                <div className="sidebarchat__text-lastmessage">
                    {messages[messages.length - 1]}
                </div>
              </div>
            </div>
            </Link>
    )
}

export default SidebarChat
