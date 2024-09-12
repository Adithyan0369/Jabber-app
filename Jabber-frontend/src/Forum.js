import React from 'react'
import Chat from './Chat'
import Profile from './Profile'
function Forum({listRoom}) {
  return (
      <div className=' bg-purple-900 flex justify-center items-center h-full w-screen shadow-lg rounded-xl'>
      <Chat/>
      <Profile listRoom={listRoom}/>
    </div>
  )
}

export default Forum
