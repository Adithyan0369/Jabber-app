import React from 'react';
import LogoS from '../assets/images/slogan.png';

function Profile() {
  return (
    <div className='bg-gray-800 h-full w-[30%] shadow-lg rounded-xl p-4 flex items-center justify-center'>
      <div className='relative'>
        <img className='rounded-lg' src={LogoS} alt='Logo' />
      </div>
    </div>
  );
}

export default Profile;
