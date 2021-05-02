import React from 'react'
import './message.css'
import { useSelector } from 'react-redux'

function Message({ id, name, message, timestamp}) {

  const user = useSelector(state => state);

  return (
    <div style={{backgroundColor : name === user.user.user.displayName ? 'lightgreen' : 'white',
                  marginLeft : name === user.user.user.displayName ? 'auto' : 'none'}} className="message">
        <span className="message__sendername">{name}</span>
        <p className="message__text">
              {message}
              <span className="message__text-sentat">
                  {new Date(timestamp?.toDate()).toUTCString()}
              </span>
        </p>
    </div>
  )
}

export default Message
