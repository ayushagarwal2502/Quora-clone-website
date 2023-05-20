import React from 'react'
import {Avatar} from "@material-ui/core"
import "./css/QuoraBox.css"

function QuoraBox() {
  return (
    <div className='quoraBox'>
        <div className='quoraBox__info'>
      <Avatar/>
       </div>
       <div className='quoraBox__quora'>
        <p> What is your quetions or link </p>
       </div>
    </div>
  )
}

export default QuoraBox
