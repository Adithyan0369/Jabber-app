// TaskBar.js
import React from 'react';
import { Avatar, IconButton } from '@material-ui/core';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import ChatIcon from '@mui/icons-material/Chat';
import Person2Icon from '@mui/icons-material/Person2';
import SettingsIcon from '@mui/icons-material/Settings';
import HelpIcon from '@mui/icons-material/Help';
import { Link } from 'react-router-dom';
import { useStateValue } from './StateProvider';
import { auth } from './firebase';
import { actionType } from './Reducer';
import LogoutIcon from '@mui/icons-material/Logout';

function TaskBar() {
  const [{ user },dispatch] = useStateValue();
  const signOut = () => {
       auth.signOut().then(() => {
           dispatch({
               type: actionType.LOGOUT_USER,
           });
       }).catch((error) => {
           console.error('Error signing out: ', error);
       });
   };
  return (
    <div className="bg-gray-900 shadow-lg border-2 border-gray-800 rounded-lg p-4 w-20 md:w-24 lg:w-28 relative top-1/2 transform -translate-y-1/2">
      <div className="flex flex-col items-center">
        <div className="mb-4">
          <Avatar src={user?.photoURL} className="h-16 w-16 md:h-20 md:w-20 lg:h-24 lg:w-24" />
        </div>
        <div className='mt-12'>
        <Link to={'/'}>
          <IconButton>
            <HomeRoundedIcon className="text-purple-500" />
          </IconButton>
        </Link>
        <Link to={'/addChat'}>
          <IconButton>
            <ChatIcon className="text-purple-500" />
          </IconButton>
        </Link>
        <Link to={'/contact'}>
          <IconButton>
            <HelpIcon className="text-purple-500" />
          </IconButton>
        </Link>
        <IconButton onClick={signOut}>
          <LogoutIcon className="text-purple-500" />
        </IconButton>
        </div>
      </div>
    </div>
  );
}

export default TaskBar;
