import React, { useState } from "react";
import DashboardCount from "../DashBoardCount/DashboardCount";
import { MdOutlineMoreHoriz } from "react-icons/md";
import AppointmentCard from "../AppointmentCard/AppointmentCard";
import {
  MdCalendarToday,
  MdVisibility,
  MdAccountBalanceWallet,
  MdPeopleOutline,
} from "react-icons/md";
import Link from 'next/link'
import {useRouter} from 'next/router'
import { formatDate } from "../../utils";
const ComponentHeading = ({ text }) => (
  <div className="w-full rounded-t-xl flex justify-between items-center bg-headingBackground dark:bg-darkElevation-100 h-12 px-4">
    <div className="font-medium text-gray-700 dark:text-gray-400">{text}</div>
    <div className="text-gray-600 hover:scale-110 cursor-pointer">
      <MdOutlineMoreHoriz size={23} />
    </div>
  </div>
);

const MessageCard = ({message})=>{
  return (
    <Link href={`/appointments/${message.appointmentId}`}>
    <div className="bg-primary dark:bg-darkElevation-400 dark:bg-opacity-100 p-2 bg-opacity-5 hover:bg-opacity-10 cursor-pointer flex items-center space-x-3 rounded-md">
      <div className="bg-primary h-[30px] w-[30px] rounded-full"></div>
      <div>
      <div className="text-[14px] dark:text-gray-400">{message.sender.fullName}</div>
      <div className="text-[12px] text-gray-500">{message.text.length>15?message.substr(0,12)+'...':message.text}<span className="text-gray-600"> {" "}· 32m</span></div>
      </div>
    
    </div>
    </Link>
  )
}
const schdulesArray = (appointments)=>{
 
  let arr = [];
  appointments.filter(a=>a.state==='active').map(a=>{
    const arr2 = a.schedules.filter(s=>s.state==='future').map(s=>({...s,patientId : a.patient.uuid,patientName : a.patient.user.fullName, appointmentId : a.id, }))
    arr = [...arr,...arr2]
  });
  return arr;
}


const ScheduleCard = ({schedule})=>{
  const router = useRouter();
  return (
    <div onClick={()=>router.push(`/appointments/${schedule.appointmentId}`)} className="bg-slate-100 dark:bg-darkElevation-500 rounded-md text-sm hover:bg-slate-200 transition-all cursor-pointer flex justify-between p-2 dark:px-3 py-4">
      <div className="font-semibold">
        <div>{schedule.title}</div>
      </div>
      <div >{schedule.patientName}</div>
      <div className="">{formatDate(schedule.at)}</div>
      <div>✅</div>
    </div>
  )
}
const DoctorDashboard = ({stats, appointments, messages}) => {
  console.log(appointments)

  const [dashboardState, setDashboardState] = useState('Doctor');
  const [schedule, setSchedule] = useState(schdulesArray(appointments))
  console.log(schedule)
  return (
    <div className="mt-14">
      
      <div className="grid grid-cols-4 grid-flow-col  space-x-3">
        <DashboardCount
          icon={<MdCalendarToday size={36} />}
          count={stats.totalAppointments}
          text="3 today!✅"
          title="Appointments"
        ></DashboardCount>
        <DashboardCount
          icon={<MdVisibility size={39} />}
          count={stats.profileViews}
          text="43% Higher⚡"
          title="Profile Views"
        ></DashboardCount>
        <DashboardCount
          icon={<MdAccountBalanceWallet size={38} />}
          count={stats.totalRevenue}
          text="430$+ This week"
          title="Total Revenue"
        ></DashboardCount>
        <DashboardCount
          icon={<MdPeopleOutline size={40} />}
          count={stats.totalPatients}
          text="7 Active"
          title="Total Patients"
        ></DashboardCount>
      </div>
      <div className="flex mt-9 space-x-7">
        <div className="bg-white dark:bg-darkElevation-300 w-[570px] rounded-xl h-[410px]">
          <ComponentHeading text="Active Appointments" />
          <div className="mt-3 p-3 flex flex-col space-y-3">
          {schedule.length>0?schedule.map(s=>(
             <div><ScheduleCard schedule={s}/></div>
           )):<div>No Appointments Found</div>}
          </div>
        </div>
        
        <div className="bg-white h-[410px] dark:bg-darkElevation-300 rounded-xl w-[330px]">
          <ComponentHeading text="Messages" />
          <div className="mt-3 p-3 flex flex-col space-y-3">
            {messages.filter(m=>m.state==='unseen').length>0?messages.filter(m=>m.state==='unseen').map(m=>(
              <MessageCard message={m}/>
            )):(<div className="text-sm text-gray-800 dark:text-gray-600">No New Messages</div>)}
          </div>
        </div>
        <div className="bg-white h-[410px] dark:bg-darkElevation-300 rounded-xl w-[300px]">
          <ComponentHeading text="Notification" />
          <div className="flex text-center h-4/5 w-4/5 m-auto justify-center items-center">
            <div className="text-sm text-gray-800 dark:text-gray-600">This Feature is not currently under development</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;
