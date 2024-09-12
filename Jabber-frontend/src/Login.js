import React from 'react'
import {Button} from "@material-ui/core"
import {auth,provider} from './firebase'
import "./Login.css"
import { useStateValue } from './StateProvider'
import { actionType } from './Reducer'
import LogoS from './logooo.png'
function Login() {
    const [{user},dispatch] = useStateValue();
  const signIn=()=>{
      auth
      .signInWithPopup(provider)
      .then(result=>{
        dispatch({
            type:actionType.SET_USER,
            user:result.user,
        })
      })
      .catch(error=>alert(error.message));
  }
  return (
    <div className='login'>
      <div className='login_container'>
        <img className='image1' src={LogoS} alt=''/>
        <div className='login_text'>
        </div>
        <Button type='submit' onClick={signIn}>
            Sign In With Google
        </Button>
      </div>
    </div>
  )
}

export default Login
