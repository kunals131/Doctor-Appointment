import React, { useState, useEffect } from "react";
import { MdLogout,MdOutlineScheduleSend, MdSearch, MdArrowDownward, MdUser } from "react-icons/md";
import { FaUserAlt } from "react-icons/fa";
import {BsChevronDown} from 'react-icons/bs'
import {AiOutlineMessage, AiOutlineRobot} from 'react-icons/ai';
import {GrSchedule} from 'react-icons/gr';
import {FaFileMedicalAlt, FaFilePrescription} from 'react-icons/fa';
import Conversation from "../../components/Appointment/Views/Conversation";
import Schedules from "../../components/Appointment/Views/Schedules";
import { verifyAuthentication } from "../../utils/verifyAuth";
import { getAllUserDetailsAPI, getAppointmentAPI, getAppointmentSchedules, getMessagesAPI } from "../../api/common";
import io from 'socket.io-client';
import { updateUser } from "../../redux/actions/user";
import Link from 'next/link'
import {useRouter} from 'next/router'; 
import { useDispatch } from "react-redux";

export const getServerSideProps = async (ctx) => {
  const auth = verifyAuthentication(ctx.req);
  const {id} = ctx.query;
  if (!auth.state) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  const userData = await getAllUserDetailsAPI(auth.decodedData.uuid);
  auth.decodedData = userData.data;
  if (auth.decodedData.isNew) return {redirect : {destination : '/new'}}
  try {
    const appointment = await getAppointmentAPI(id);
    const messages = await getMessagesAPI(id);
    console.log(appointment)
    const schedules = await getAppointmentSchedules(id);
    return {props : {user : auth.decodedData,fetchedMessages : messages.data, appointment : appointment.data, schedules : schedules.data}}
    
  }catch(error) {
    console.log(error);
    return {
      notFound : true
    }
  }
  return {props : {}}
};


const getUserFromId = (users,id)=>{
  return Object.values(users).filter(u=>u.uuid===id)[0];
}





const MenuItem = ({title,value,view,setView, icon})=>{
  const active = view===value;
  return (
    <div onClick={()=>setView(value)} className={`flex space-x-4  hover:text-white hover:font-semibold transition-all cursor-pointer ${active?'bg-primary text-white':'text-slate-400'}  text-sm items-center p-2 px-4`}>
      {icon}
      <div>{title}</div>
    </div>
  )
}

const Heading = ({view,appointment})=>{
  const router = useRouter();
  return (
    <div className="flex items-center space-x-3" onClick={()=>router.push(`/patient/${appointment.patientId}`)}>
    <FaUserAlt className="font-bold text-white" size={15}  />
            <div className="font-semibold text-sm text-gray-400 underline underline-offset-4 hover:text-darkSecondary transition-all cursor-pointer">
              {appointment.patient.user.fullName}
            </div>
    </div>
  )
}

const Appointment = ({schedules, appointment,user, fetchedMessages}) => {
  const dispatch= useDispatch();
useEffect(()=>{
  dispatch(updateUser(user));
  
}, [])

  console.log( appointment, user)
    const getOtherUser = ()=>{
      return  appointment[user.role==='doctor'?'patient':'doctor'].user
    }
    console.log(fetchedMessages)
 

  const [messages,setMessages] = useState(fetchedMessages);
 
  const [socket,setSocket] = useState(['hellow']);
  useEffect(()=>{
    const newSocket = io('http://localhost:5000', {
      query : {id : user.uuid}
    })
    setSocket(newSocket);
    newSocket.on('receive-message', (result)=>{
      setMessages((list)=>[result,...list,])
    })

    return ()=>newSocket.close();
  }, [])

 
  const [view,setView] = useState('conversation');
  return (
    <div className="h-screen w-screen bg-white overflow-x-hidden">
      <div className="bg-[#121016] dark:bg-darkElevation-100 h-[7vh] p-2 px-10 items-center justify-between flex">
        <div>
          <Link href="/appointments" >
          <div className="bg-[#1C1F23] dark:bg-darkElevation-500 p-2 flex group items-center text-xs space-x-4 rounded-md">
            <MdLogout className="text-primary dark:text-darkSecondary" size={17} />
            <label
              htmlFor=""
              className="scale-0  group-hover:scale-100 transition-all dark:bg-darkSecondaryVariant text-white bg-[#1C1F23] left-16 p-2 rounded-md absolute "
            >
              Go Back
            </label>
            </div>
          </Link>
        </div>
        <div className="flex items-center">
          <input
            type="text"
            className="w-[550px] bg-[#1C1F23] dark:bg-darkElevation-500 rounded-md p-2 text-white focus:outline-[1px] focus:outline-primary focus:border-0 outline-none  text-xs"
            placeholder="Search "
          />
          <MdSearch className="text-gray-500 relative right-8" size={18} />
        </div>
        <div className="w-[30px] h-[30px] rounded-md bg-primary bg-opacity-30"></div>
      </div>
      <div className="flex h-[93vh]">
        <div className="w-[20vw] border-r-[1px] dark:bg-darkElevation-200 bg-[#19171D] border-primary dark:border-darkElevation-900  border-opacity-30">
          <div className="flex items-center border-b-[1px] border-primary dark:border-darkElevation-900  border-opacity-30 space-x-3 p-6">
            <div className="font-bold tracking-tight text-sm text-white">
              {appointment.title}
            </div>
            <BsChevronDown className="font-bold text-white" size={15} />
          </div>
          <div className="mt-2 py-6 space-y-3">
            <MenuItem title="Conversation" icon={<AiOutlineMessage size={19}/> } view={view} setView={setView} value="conversation" />
            <MenuItem title="Schedules" icon={<MdOutlineScheduleSend size={20}/> } view={view} setView={setView} value="schedules" />
            <MenuItem title="Medical Records" icon={<FaFileMedicalAlt size={18}/> } view={view} setView={setView} value="records" />
            <MenuItem title="AI Diagnosis Reports" icon={<AiOutlineRobot size={18}/> } view={view} setView={setView} value="aidiagnosis" />
            <MenuItem title="Prescriptions" icon={<FaFilePrescription size={18}/> } view={view} setView={setView} value="prescriptions" />
          </div>
          <hr  className="border-primary dark:border-darkElevation-900   border-opacity-20"/>
          <div className="mt-5 px-4">
            <div className="text-sm text-slate-200 font-semibold mb-2">Actions</div>
         
              <hr className="border-slate-600" />
              <div className="mt-4 text-slate-200 text-xs space-y-5">
              <div className="border-b-[1px] border-slate-800 pb-3 cursor-pointer hover:scale-105 transition-all">⌚ Schedule Meeting</div>
              <div className="border-b-[1px] border-slate-800 pb-3 cursor-pointer  hover:scale-105 transition-all">🏥 Send Prescription</div>
              <div className="border-b-[1px] border-slate-800 pb-3 cursor-pointer  hover:scale-105 transition-all">💵 Request Payment</div>
            </div>
          </div>
        </div>
        <div className="w-[80vw] bg-[#1C1F23] dark:bg-darkElevation-50">
        <div className="flex items-center border-b-[1px] border-primary dark:border-darkElevation-900 border-opacity-30 space-x-3 p-6">
            <Heading view={view} appointment={appointment}/>
          </div>
         <div className="h-[calc(93vh-70px)]">
           {view==='conversation'&&<Conversation messages={messages} user={user} appointmentId={appointment.id} otherUser = {getOtherUser()} setMessages={setMessages} socket={socket}/>}
           {view==='schedules'&&<Schedules socket={socket} schedules={schedules} user={user} appointmentId={appointment.id} doctor={appointment.doctor.uuid}/>}
         </div>
        </div>
      </div>
    </div>
  );
};

export default Appointment;
