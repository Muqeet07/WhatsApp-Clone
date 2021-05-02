import React, { useState, useEffect } from 'react'
import './sidebar.css'
import { Avatar, IconButton } from '@material-ui/core';
import { DonutLarge, Chat, MoreVert, SearchOutlined } from '@material-ui/icons'
import SidebarChat from './SidebarChat';
import { db } from './firebase';
import { useSelector } from 'react-redux'

function Sidebar() {

  const [rooms, setRooms] = useState([]);
  const [searchedRooms, setSearchedRooms] = useState([]);
  const [searchRoom, setSearchRoom] = useState('');
  const user = useSelector(state => state)

  useEffect(()=> {
    const unsubscribe = db.collection('rooms').onSnapshot(snapshot => {
        setRooms(snapshot.docs.map(doc => (
          {
            id : doc.id,
            data : doc.data()
          }
        )))
    })

    return () => {
      unsubscribe();
    }
  }, [])

  useEffect(()=> {
    const unsubscribe = db.collection('rooms').where("roomname", "==", `${searchRoom}`).onSnapshot(snapshot => {
        setSearchedRooms(snapshot.docs.map(doc => (
          {
            id : doc.id,
            data : doc.data()
          }
        )))
    })

    return () => {
      unsubscribe();
    }
  }, [searchRoom])

  const searchHandler = (e) => {
      setSearchRoom(e.target.value); 
  }


  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <Avatar src={user.user.user.photoURL}/>
        <div className="sidebar__header-right">
            <IconButton>
                <DonutLarge />
            </IconButton>
            <IconButton>
                <Chat />
            </IconButton>
            <IconButton>
                <MoreVert />
            </IconButton>
        </div>
      </div>
      <div className="sidebar__search">
        <SearchOutlined />
        <div className="sidebar__search-searchbar">
            <form>
                <input 
                    type="search"
                    name="search"
                    placeholder="Search or Start new chat"
                    value={searchRoom}
                    onChange={searchHandler}
                />
            </form>
        </div>
      </div>
      <div className="sidebar__chats">
        <SidebarChat openprompt/>
          {
            !searchRoom ? 
              rooms?.map(room => {
                return <SidebarChat key={room.id} id={room.id} roomname={room.data.roomname} />
            }) : 
             searchedRooms?.map(room => {
              return <SidebarChat key={room.id} id={room.id} roomname={room.data.roomname} />
          })
          }
      </div>
    </div>
  )
}

export default Sidebar
