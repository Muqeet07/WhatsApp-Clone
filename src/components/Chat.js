import React, { useEffect, useState } from 'react'
import './chat.css'
import { Avatar, IconButton } from '@material-ui/core'
import { SearchOutlined, AttachFile, MoreVert, EmojiEmotionsOutlined, Mic } from '@material-ui/icons'
import Message from './Message'
import { useParams } from 'react-router-dom'
import { db } from './firebase'
import firebase from 'firebase'
import { useSelector } from 'react-redux'

function Chat() {

  const { roomid } = useParams();
  const [roomname, setRoomname] = useState("");
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const user = useSelector(state => state);

  useEffect(()=> {
      if(roomid){
        db.collection('rooms')
          .doc(roomid)
          .onSnapshot(snapshot => {
            setRoomname(snapshot.data().roomname)
          })
        }
  }, [roomid])

  useEffect(()=>{
    if(roomid){
      db.collection('rooms')
        .doc(roomid)
        .collection('messages')
        .orderBy("timestamp", "asc")
        .onSnapshot(snapshot => {
            setMessages(snapshot.docs.map(doc => (
              {
                id : doc.id,
                data : doc.data()
              }
            )))
        })
    }
  },[roomid])


  const sendMessage = (e) => {
    e.preventDefault();

    if(roomid){
      db.collection('rooms')
      .doc(roomid)
      .collection('messages')
      .add({
        name : user.user.user.displayName,
        message : input,
        timestamp : firebase.firestore.FieldValue.serverTimestamp()
      })
    }

    setInput("");
  }

  let newtimestamp = messages[messages.length - 1]?.data.timestamp;


  return (
    <div className="chat">
      <div className="chat__header">
        <div className="chat__header-left">
            <Avatar />
            <div className="chat__header-left__text">
                <div className="chat__header-left__text-name">
                    {roomname}
                </div>
                <div className="chat__header-left__text-lastseen">
                    last seen at {new Date(newtimestamp?.toDate()).toUTCString()}
                </div>
            </div>
        </div>
        <div className="chat__header-right">
            <IconButton>
                <SearchOutlined />
            </IconButton>
            <IconButton>
                <AttachFile />
            </IconButton>
            <IconButton>
                <MoreVert />
            </IconButton>
        </div>
      </div>
      <div className="chat__messagescontainer">
        {messages?.map(message => {
          return <Message key={message.id} 
                          id={message.id} 
                          message = {message.data.message}
                          name = {message.data.name}
                          timestamp = {message.data.timestamp}
                 />
        })}
      </div>
      <div className="chat__footer">
          <IconButton>
                <EmojiEmotionsOutlined />
          </IconButton>
        <form onSubmit={sendMessage}>
            <input
                type="text"
                name="input"
                placeholder="Type a message" 
                value={input}
                onChange={(e)=>setInput(e.target.value)}
            />
            <button type="submit">Send</button>
        </form>
        <IconButton>
            <Mic />
        </IconButton>
      </div>
    </div>
  )
}

export default Chat
