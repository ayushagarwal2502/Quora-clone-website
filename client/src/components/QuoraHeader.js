import React, { useState } from 'react'
import HomeIcon from '@material-ui/icons/Home';
import FeaturedPlayListIcon from '@material-ui/icons/FeaturedPlayList';
import AssignmentTurnedInOutlined from '@material-ui/icons/AssignmentTurnedInOutlined'
import PeopleAltOutlined from '@material-ui/icons/PeopleAltOutlined'
import {NotificationsOutlined,ExpandMore } from '@material-ui/icons';
import SearchIcon from '@material-ui/icons/Search';
import CloseIcon from '@material-ui/icons/Close';
import {Button,Avatar,Input} from '@material-ui/core';
import {Modal} from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import "./css/QuoraHeader.css";
import axios from 'axios';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { logout } from '../feature/userSlice';
import { useDispatch } from 'react-redux';

function QuoraHeader() {

const[isModalOpen,setIsModalOpen]=useState(false);
const [inputUrl,setInputUrl ]=useState("");
const[question,setQuestion]=useState(""); 
const dispatch=useDispatch();
const Close=(<CloseIcon/>)
   
 const handleLogout=()=>{
  if(window.confirm('Are You sure to Logout')){
   signOut(auth).then(()=>{
    dispatch(logout())
    console.log("Logged Out")
   }).catch((error)=>{
     console.log("error");
   })
  }
 }

async function handlesubmit(){

  if(question !==""){
    const config ={
      headers:{
        "content-type":"application/json"
      }
    }        
      const body ={
        questionName:question,
        questionUrl: inputUrl
      }
    
    await axios.post('/api/questions',body,config).then((res)=>{
      console.log(res.data)
      alert(res.data.message)
      window.location.href="/";
    }).catch((e)=>{
      console.log(e);
      alert('Error in adding questions')
    })
  }
 }
 

  return (
    <div className='qHeader'>
      <div className='qHeader-content'>

                    <div className='qHeader__icons'>
                     <div className='qHeader__icon'><HomeIcon/></div>
                     <div className='qHeader__icon'><FeaturedPlayListIcon/></div>
                     <div className='qHeader__icon'><AssignmentTurnedInOutlined/></div>
                     <div className='qHeader__icon'><PeopleAltOutlined/></div>
                     <div className='qHeader__icon'><NotificationsOutlined/></div>
                    </div>
          
          <div className='qHeader__input'>
              <SearchIcon />
              <input type="text" placeholder="search questions" />
          </div>
          <div className='qHeader__Rem'>
            <span><Avatar onClick={handleLogout}/></span>    
          </div>
          <Button onClick={()=>setIsModalOpen(true)}>Add Questions</Button>
          <Modal open={isModalOpen}
           closeIcon={Close} onClose={()=>setIsModalOpen(false)}
           closeOnEsc
           center
           closeOnOverlayClick={false}
           styles={{
            overlay:{
              height:"auto",
            }
           }}
          >
            <div className='modal__title'>
              <h5>Add Question</h5>
              <h5>Share Link</h5>
            </div>
            <div className='modal__info'>
                  <Avatar className='avatar' />
                  <div className='modal__scop'>  
                     <PeopleAltOutlined />
                     <p>Public</p>
                     <ExpandMore />
                  </div>
            </div>
            <div className='modal__Field'>
             <Input 
             value={question}
             onChange={(e)=>setQuestion(e.target.value)}
             type="text" placeholder="Start Your question 'with', 'what', 'why'"/>
            <div style={{
              display:"flex",
              flexDirection:"coloumn"
            }}
            >
            <input value={inputUrl}
            onChange={(e)=>setInputUrl(e.target.value)} style={{margin:"5px,0",
                 border:"1px solid lightgray",
                 padding:"10px",
                 outline:"2px solid #000",
          
          }} type="text" placeholder="Optional: include a link that given context"/>
           {inputUrl !=="" && <img style={{height:"40vh",
           objectFit:"contain"}}
           
           src={inputUrl}
           alt='displayimage'/>
           }
           <img src={inputUrl} alt='displayimage' />
            </div>
            </div>
            <div className='modal__button'>
            <button className='cancel' onClick={()=>setIsModalOpen(false)}> 
           cancel
        </button>
        <button onClick={handlesubmit} type='submit'  className="add" > 
           Add Question 
        </button>
            </div>
          </Modal>
      </div>
      </div>
  )
}

export default QuoraHeader
