import React from 'react'
import './login.css'
import { auth, provider } from './firebase'
import setUserAction from './redux/actions/setUserAction'
import { useDispatch } from 'react-redux'

function Login() {

  const dispatch = useDispatch();

    const loginHandler = async () => {
        auth.signInWithPopup(provider)
            .then(data => {
                dispatch(setUserAction(data))
            }).catch(error => {
                alert(error.message)
            })
    }

  return (
    <div className="login">
      <button 
        className="login__button"
        onClick={loginHandler}
      >
          Sign In with Google
      </button>
    </div>
  )
}

export default Login
