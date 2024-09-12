import React from 'react'
import './imgPopUp.css'

function ImgPopUp({setPopUp,inputU,setInputU}) { 

  return (
       <div className='popup'>
      <h3>Add Image:</h3>
      <input type="text" value={inputU} onChange={(e)=>setInputU(e.target.value)} placeholder='Paste URL' ></input>
      <div className='sub'>
     
      {inputU && <button onClick={()=> setPopUp(false)} type='submit'>Upload image</button>}
      </div>
      
    </div>
    
  )
}

export default ImgPopUp
