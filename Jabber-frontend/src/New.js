import React from 'react'
import AddNewChat from './AddNewChat'
import Logo from './Components/logo'
function Forum(props) {
  const {rooms,setRooms} = props.listRoom;
  return (
    <div className='bg-indigo-950 flex justify-center items-center h-full w-screen shadow-lg rounded-xl'>
      <AddNewChat listRoom1={{ rooms, setRooms }}/>
      <Logo/>
    </div>
  )
}

export default Forum
