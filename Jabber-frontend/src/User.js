import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import SearchIcon from '@mui/icons-material/Search';
import SidebarUser from './SidebarUser';
import { useStateValue } from './StateProvider';
const APILINK = "https://jabber-public-discussion-forum.onrender.com/api/v1/jabber/chat/";

function User({ listRoom }) {
  const { rooms, setRooms,setRoomFlag,roomFlag } = listRoom;
  const [srooms, setSRooms] = useState('');
  const [{user},dispatch] = useStateValue();
  
  useEffect(() => {
    Axios.get(APILINK)
      .then(res => {
        console.log(res.data);
        setRooms(res.data);
      })
      .catch(err => {
        console.log(err);
        console.log("error");
      });
  }, [roomFlag]);

  const filteredRooms = rooms.filter(room => 
    room.roomName.toLowerCase().includes(srooms.toLowerCase())
  );

  return (
    <div className="user flex flex-col bg-gray-900 shadow-lg rounded-xl p-4 h-full w-full sm:w-96 md:w-80 lg:w-[33%] border-2 border-gray-800">
      <div className="sidebar_search flex items-center mb-4">
        <div className="sidebar_searchContainer flex items-center bg-gray-700 rounded-full w-full px-4 py-2">
          <SearchIcon className="text-white w-5 h-5" />
          <input 
            value={srooms}
            onChange={(e) => setSRooms(e.target.value)}
            className="bg-transparent text-white text-sm outline-none ml-2 flex-grow"
            placeholder="Search or start new chat"
            type="text"
          />
        </div>
      </div>
      <div className=" overflow-y-scroll scrollbar-hide">
        {filteredRooms.map(room => (
          <SidebarUser key={room._id} id={room._id} name={room.roomName} image={room.profileImage} />
        ))}
      </div>
    </div>
  );
}

export default User;
