import React from 'react'
import "./Login.css";
import {signInWithPopup} from 'firebase/auth'
import {auth,provider}  from '../../firebase';

const Login = () => {

  const handleSubmit= async () =>{
          await signInWithPopup(auth,provider).then((result)=>{
            console.log(result);
          })
          .catch((error)=>{
               console.log(error)
          });
  }
  return (
    <div className='login-container'>
        <div className='login-content'>
               <img src='' alt='' />
               <button onClick={handleSubmit} className='btn-btn-login'>Login to Continue</button>
        </div>
      
    </div>
  )
}

export default Login
