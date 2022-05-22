import React from 'react';
import {MdAccountBox} from 'react-icons/md';
const DashboardCount = ({count,title,text,icon}) => {
  return (
  <div className='bg-white dark:bg-darkElevation-200 rounded-xl p-6 w-72 h-36 cursor-pointer flex items-center justify-between hover:bg-iconBg hover:text-white group transition'>
    <div>
      <div className='font-medium text-2xl'>{count}</div>
      <div className='text-gray-600 dark:text-gray-500 text-sm tracking-wide group-hover:text-white'>{title}</div>
      <div className='text-green-700 dark:text-darkPrimary text-[0.7rem] mt-1 group-hover:text-white'>{text}</div>
    </div>
    <div className='h-18 group-hover:bg-white group-hover:text-primary dark:group-hover:bg-darkElevation-800 dark:group-hover:text-white  w-18 rounded-full bg-dashboardCountIcon bg-gradient-to-r dark:from-darkElevation-300 dark:bg-darkElevation-800 from-dashboardCountIcon flex items-center justify-center text-gray-700 dark:text-darkSecondary'>
      {icon}
    </div>
  </div>
  );
  
};

DashboardCount.defaultProps = {
  
    count : 1500,
    title : 'Appointments',
    text : '3 today✅',
    icon : <MdAccountBox size={40}/>

}

export default DashboardCount;
