// SidebarUser.js
import React from 'react';
import { Link } from "react-router-dom";
import { Avatar } from '@material-ui/core';


function SidebarUser({ id, name, image }) {
  return (
    <Link to={`/rooms/${id}`} className="no-underline text-black">
      <div className="flex items-center p-3 cursor-pointer rounded-xl bg-gray-900 hover:bg-gray-800 hover:scale-105 transition-transform duration-200 ">
        <Avatar src={image} />
        <div className="ml-4 flex-1">
          <h3 className="text-white text-base mb-2">{name}</h3>
        </div>
        
      </div>
    </Link>
  );
}

export default SidebarUser;
