import moment from 'moment';
import React, { useEffect, useState } from 'react'
import {MdOutlineAlarm} from 'react-icons/md'
import {MdClock, MdLogin} from 'react-icons/md'
import { useSelector } from 'react-redux';
import { createScheduleAPI, updateSchedulesAPI } from '../../../api/common';
import {useRouter} from 'next/router'
const formatDate = (date)=>{
  return   moment(date).format('H:MMA DD MMMM YYYY')
}
const getDiff = (date)=>{
  const date1 = moment(date);

  return date1.diff(moment.now(), 'days') 
}

const ScheduleItem = ({schedule, patientId, doctorId, appointmentId,})=>{
  // console.log(url)
  const state = schedule.state;
  const router = useRouter();
  const user = useSelector(state=>state.user.data);
  console.log(user.fullName);
  const setStateDone = async()=>{
    const res = await updateSchedulesAPI(schedule.id,{state : 'done'})
    console.log(res);
  }
  return (
  <div className='w-full hover:bg-[#383c41] transition-all bg-[#222529] p-5 px-8 rounded-md flex justify-between items-center'>
    <div className=''>{schedule.title}</div>
    <div className='flex items-center space-x-2'> <MdOutlineAlarm/><div> {formatDate(schedule.at)}</div></div>
   {state==='future'&&<div className='flex items-center space-x-2'>
      <div className='p-2 rounded-md text-sm bg-[#2b2f34] cursor-pointer hover:bg-[#1415179e] transition-all flex space-x-1 items-center'><a href={`http://localhost:3001/room/${schedule.id}?name=${user.fullName.split(' ').join('')}`}>🚪ENTER</a></div>
      <div className='p-2 rounded-md text-sm bg-[#2b2f34] cursor-pointer hover:bg-[#1415179e] transition-all' onClick={setStateDone}>✅Done</div>
      <div className='p-2 rounded-md text-sm bg-[#2b2f34] cursor-pointer hover:bg-[#1415179e] transition-all'>⌚Reschedule</div>
    </div>}
    
  </div>
  );
}

const initialState ={
  title : '',
  date : '',
  time : ''
}

const SchduleCreator = ({appointmentId, currentSchedules, setCurrentSchedules})=>{
 
  const [creatorData,setCreatorData] = useState(initialState);
  const handleSubmit = async()=>{
    const realDate = moment(creatorData.date + 'T' + creatorData.time).format("YYYY-MM-DDTHH:mm:ss.000Z")
    try {
    const res = await createScheduleAPI(appointmentId, {at : realDate, title : creatorData.title });
    console.log(res);
    console.log(res.data)
    setCurrentSchedules([...currentSchedules, res.data]);
    }catch(err) {console.log(err.response.data.message)
    }
  }
  return (
    <div className='p-3 bg-[#222529] text-white rounded-md text-xs'>
      <div className='grid grid-cols-[1.3fr_1.4fr_1.4fr_1fr] gap-10 w-full mb-3 text-slate-400'>
        <div>Title</div>
        <div>Schdule Date</div>
        <div>Schdule Time</div>
        <div>Schdule Actions</div>
      </div>
      <div className='grid grid-cols-[1.3fr_1.4fr_1.4fr_1fr] gap-10 w-full'>
        <div className=''>
          <input value={creatorData.title} onChange={(e)=>setCreatorData({...creatorData,title : e.target.value})} type="text" className='w-full rounded-md p-[6px] px-2 bg-[#32353a]' placeholder='Enter Title' />
        </div>
        <div className=''>
          <input value={creatorData.date} onChange={(e)=>setCreatorData({...creatorData,date : e.target.value})} type="date" className='w-full rounded-md p-[6px] px-2 text-slate-300 bg-[#32353a]' />
        </div>
        <div className=''>
          <input value={creatorData.time} type="time" onChange={(e)=>setCreatorData({...creatorData, time : e.target.value})} className='w-full rounded-md p-[6px] px-2 text-slate-300 bg-[#32353a]' />
        </div>
        <div className='flex space-x-2 text-xs items-center'>
          <div onClick={handleSubmit} className='w-fit bg-primary p-2 rounded-md px-5 text-white bg-opacity-50'>Create</div>
          <div onClick={()=>setCreatorData(initialState)} className='w-fit bg-red-600 p-2 rounded-md px-5 text-white bg-opacity-50'>Clear</div>
        </div>
      </div>
    </div>
  )
}

const Schedules = ({schedules, appointmentId, doctor, user}) => {
  console.log(schedules, user)
  const name = useSelector(state=>state.user.data).fullName
  console.log(name)
  useEffect(()=>{
    const updateSchedules = async()=>{
      for(let i=0; i<schedules.length; ++i) {
        const s = schedules[i];
        if (s.state==='future') {
          if (getDiff(s.at)<0) {
            const res = await updateSchedulesAPI(s.id,{state : 'past'})
            console.log(res.data);
          } 
        }
      }
    }
    try {
      updateSchedules();
    }catch(err) {
      console.log(err);
    }
    console.log('RAN')
  }, [])
  
  const [currentSchedules, setCurrentSchedules] = useState(schedules);
  return (
    <>
    <div className='text-slate-400 p-4 h-[485px] overflow-y-auto'>
      <div className='text-lg'>Scheduled</div>
      <hr className='border-[#4a4f55] my-3'/>
      <div className='mt-4 space-y-4'>
      {currentSchedules.filter(s=>s.state==='future').map(s=><ScheduleItem schedule={s}/>)}
      </div>
      <div className='text-lg mt-9'>PAST & DONE</div>
      <hr className='border-[#4a4f55] my-3'/>
      <div className='mt-4 space-y-4'>
      {currentSchedules.filter(s=>(s.state==='past' || s.state==='done')).map(s=><ScheduleItem  key={s.id} schedule={s}/>)}
      </div>
    </div>
    <div className='mt-1 p-1'>
      <SchduleCreator setCurrentSchedules={setCurrentSchedules} currentSchedules={currentSchedules} appointmentId={appointmentId}/>
    </div>
    </>
  )
}

export default Schedules