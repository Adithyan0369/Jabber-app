import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Axios from 'axios';
import './Profile.css'
import { Avatar, IconButton } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { useStateValue } from './StateProvider';

const APILINK = "https://jabber-public-discussion-forum.onrender.com/api/v1/jabber/chat/";

function Profile({listRoom}) {
  const { rooms, setRooms,setRoomFlag,roomFlag } = listRoom;
  const { id } = useParams();
  const [roomInfo, setRoomInfo] = useState([]);
 const [{user},dispatch] = useStateValue();
 const [showDeletePopup,setShowDeletePopup]  = useState();
 const navigate = useNavigate();
  useEffect(() => {
    if (id) {
      Axios.get(APILINK + id)
        .then((res) => {
          setRoomInfo(res.data);
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
          console.log("error");
        });
    }
  }, [id]);

  const handleDelete=()=>{
    Axios.delete(`${APILINK}${id}`,).then((res) => {
      console.log(res.data);
      setShowDeletePopup(true);
      setRoomFlag(!roomFlag);
      navigate('/')
      setTimeout(() => setShowDeletePopup(false), 3000);
    }).catch((err) => {
      console.log(err);
    });
  }

  

  return (
    <div className="flex flex-col items-center">
      {roomInfo.map((room) => (
        <div className=" bg-gray-900 p-6 rounded-lg shadow-lg w-full h-[95vh] md:w-[100%] lg:w-[100%] fixed-card" key={room.id}>
          <div className="flex flex-col items-center">
            <img className="h-24 w-24 rounded-full mb-4" src={room.profileImage} alt="Profile" />
            <div className='flex'>
            <h1 className="text-white text-xl mb-4 text-center">{room.roomName}</h1>
            {room.creatorEmail === user.email && (
          <div className="ml-2">
            <IconButton size="small" onClick={handleDelete}>
              <DeleteIcon style={{ color: 'white' }} />
            </IconButton>
          </div>
        )}
        </div>
            <form className="bg-indigo-900 p-4 rounded-lg w-full h-[60vh]">
              <div className="mb-4">
                <h4 className="text-white text-lg font-semibold mb-2">Creator Name:</h4>
                <p className="bg-indigo-950 text-white p-2 rounded-lg">{room.creatorName}</p>
              </div>
              <div className="mb-4">
                <h4 className="text-white text-lg font-semibold mb-2">Description:</h4>
                <p className="bg-indigo-950 text-white p-2 rounded-lg h-[33vh] overflow-y-auto scrollbar-thumb-pink-700 scrollbar-track-gray-900 scrollbar-hide">{room.theme}</p>
              </div>
            </form>
          </div>
        </div>
      ))}
       {showDeletePopup && (
        <div className="fixed bottom-4 right-4 bg-red-600 text-white p-4 rounded-lg shadow-lg">
          Message Deleted
        </div>
      )}
    </div>
  );
}

export default Profile;
