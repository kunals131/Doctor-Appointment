import React from 'react';
import {MdSearch} from 'react-icons/md'

const Header = ({profile}) => {
    const page = ''
    let black=profile.image;
  return (
  <div className="flex pt-8 items-center justify-between">
      {
    page!=='profile'&&
      <div className='flex items-center'>
      <input type="text" className='outline-none text-sm border-none shadow-md w-[300px] h-[37px] rounded-md  p-2' placeholder='Search Appointments' />
      <div className='relative -left-8 text-gray-700' >
      <MdSearch size={22}/>
      </div>
      </div>
}
      {page!=='profile'&&<div className='flex items-center space-x-6'>
      <div className="flex flex-col text-right">
              <div className='font-medium text-[0.9rem]'>{profile.name}</div>
              <div className="text-gray-600 text-[0.9rem] cursor-pointer hover:underline hover:text-primary">Edit Profile</div>
          </div>
          <div className={`rounded-full w-12 hover:scale-110 transition-all cursor-pointer border-2 border-primary h-12 bg-black)`} style={{background : `url(${profile.image}) center center/cover`}}></div>
      </div>}
  </div>);
};

Header.defaultProps = {
    profile : {
    name : 'Keith Sebastian',
    image : 'https://res.cloudinary.com/insight-byte/image/upload/v1643459644/unnamed_tqkmtj.jpg'
    }
}


export default Header;
