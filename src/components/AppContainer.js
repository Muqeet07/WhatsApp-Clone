import React from 'react'
import './appcontainer.css';
import Sidebar from './Sidebar';
import Chat from './Chat';
import { BrowserRouter as Router,
Switch,
Route } from 'react-router-dom';
import Login from './Login'
import { useSelector } from 'react-redux';

function AppContainer() {

  const user = useSelector(state => state);

  return user.user !== null ? (
    <Router>
        <div className="appcontainer">
          <Sidebar />
          <Switch>
            <Route path="/room/:roomid" component={Chat}/>
          </Switch>
        </div>
    </Router>
  ) : (
    <Login />
  )
}

export default AppContainer
