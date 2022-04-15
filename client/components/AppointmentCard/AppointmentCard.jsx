import React from 'react';
import { MdOutlineAlarm } from 'react-icons/md';
import { MdDone } from 'react-icons/md';
const AppointmentCard = ({appointment}) => {
  return (
      <div className='w-full rounded-xl flex space-x-11 hover:bg-headingBackground transition-all cursor-pointer bg-mainBackground p-3 items-center group'>
          <div className='flex space-x-2 items-center'>
          <div style={{background : `url(${appointment.image}) center center/cover`}}
          className='w-12 h-12 rounded-full'
          ></div>
           <div className='font-medium text-sm'>{appointment.name}</div>
          </div>
          {/* <div className='text-sm'>📍 {appointment.address}</div> */}
          <div className='text-sm'>📅 {appointment.date}</div>
          <div className='text-sm'>🕛 {appointment.time}</div>
          {
           appointment.status==='pending'?   
          <div><MdOutlineAlarm size={23}/></div>: <div><MdDone size={23}/></div>
        }
      </div>
  );
};

AppointmentCard.defaultProps = {
    appointment : {
    name : 'Kunal Sangtiani',
    address : 'Indore, India', 
    image : 'https://t4.ftcdn.net/jpg/02/14/74/61/360_F_214746128_31JkeaP6rU0NzzzdFC4khGkmqc8noe6h.jpg',
    date : '23 Jan 2021',
    time : '3:30 PM',
    status : 'done'
    }

}

export default AppointmentCard;
