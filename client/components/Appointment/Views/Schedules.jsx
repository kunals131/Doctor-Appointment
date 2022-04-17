import React from 'react'
import {MdOutlineAlarm} from 'react-icons/md'
import {MdClock} from 'react-icons/md'

const ScheduleItem = ()=>{
  return (
  <div className='w-full bg-[#222529] p-5 px-8 rounded-md flex justify-between items-center'>
    <div className=''>Session -1</div>
    <div className='flex items-center space-x-2'> <MdOutlineAlarm/><div> 3:00PM 16 March 2022</div></div>
    <div className='flex items-center space-x-2'>
      <div className='p-2 rounded-md text-sm bg-[#2b2f34] cursor-pointer hover:bg-[#1415179e] transition-all'>✅Mark as Done</div>
      <div className='p-2 rounded-md text-sm bg-[#2b2f34] cursor-pointer hover:bg-[#1415179e] transition-all'>⌚Reschedule</div>
    </div>
  </div>
  );
}

const SchduleCreator = ()=>{
  return (
    <div className='p-3 bg-[#222529] rounded-md text-xs'>
      <div className='grid grid-cols-[1.3fr_1.4fr_1.4fr_1fr] gap-10 w-full mb-3 text-slate-400'>
        <div>Title</div>
        <div>Schdule Date</div>
        <div>Schdule Time</div>
        <div>Schdule Actions</div>
      </div>
      <div className='grid grid-cols-[1.3fr_1.4fr_1.4fr_1fr] gap-10 w-full'>
        <div className=''>
          <input type="text" className='w-full rounded-md p-[6px] px-2 bg-[#32353a]' placeholder='Enter Title' />
        </div>
        <div className=''>
          <input type="date" className='w-full rounded-md p-[6px] px-2 text-slate-300 bg-[#32353a]' />
        </div>
        <div className=''>
          <input type="time" className='w-full rounded-md p-[6px] px-2 text-slate-300 bg-[#32353a]' />
        </div>
        <div className='flex space-x-2 text-xs items-center'>
          <div className='w-fit bg-primary p-2 rounded-md px-5 text-white bg-opacity-50'>Create</div>
          <div className='w-fit bg-red-600 p-2 rounded-md px-5 text-white bg-opacity-50'>Clear</div>
        </div>
      </div>
    </div>
  )
}

const Schedules = () => {
  return (
    <>
    <div className='text-slate-400 p-4 h-[485px] overflow-y-auto'>
      <div className='text-lg'>Today (16 March 2022)</div>
      <hr className='border-[#4a4f55] my-3'/>
      <div className='mt-4 space-y-4'>
        <ScheduleItem/>
        <ScheduleItem/>
      </div>
      <div className='text-lg mt-9'>Tomorrow (16 March 2022)</div>
      <hr className='border-[#4a4f55] my-3'/>
      <div className='mt-4 space-y-4'>
        <ScheduleItem/>
      </div>
    </div>
    <div className='mt-3 p-5'>
      <SchduleCreator/>
    </div>
    </>
  )
}

export default Schedules