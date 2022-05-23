import React, { useState } from "react";
import {AiOutlinePlusSquare} from "react-icons/ai";
import Image from "next/image";
import {AiFillRobot} from 'react-icons/ai';
import {useRouter} from 'next/router';

import InfoBox from "./InfoBox";

const ScheduleCard = ({schedule})=>{
  const router = useRouter();
  return (
    <div onClick={()=>router.push(`/appointments/${schedule.appointmentId}`)} className="bg-slate-100 dark:bg-darkElevation-300 rounded-md text-sm hover:bg-slate-200 transition-all cursor-pointer flex justify-between p-2 py-4">
      <div className="font-semibold">
        <div>New Schedule</div>
      </div>
      <div >👨‍⚕️ Doctor Keith</div>
      <div className="">⌚ 13 Jan at 2:30</div>
      <div>✅</div>
    </div>
  )
}

const MedicalRecordCard = ({record})=>{
  return (
    <div className="p-2 bg-green-100 dark:bg-darkElevation-300 rounded-md">
      <div className="text-sm  font-semibold">{record.title}</div>
      <div className="text-[0.65rem] mt-1">Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur, laboriosam?</div>
    </div>
  )
}

const DianogisCard = ({diagnosis})=>{
  const router = useRouter();
  return (
    <div onClick={()=>router.push(`/diagnosis/${diagnosis.id}`)} className="p-2 bg-pink-100 cursor-pointer dark:bg-darkElevation-300 flex hover:bg-pink-50 justify-between items-center text-sm rounded-md">
      <div className="flex space-x-5 items-center">
        <div className="p-2 rounded-md bg-pink-400"><AiFillRobot className="text-white"/></div>
        <div>{diagnosis.title}</div>
      </div>
      <div>😷{diagnosis.disease}</div>
   
    </div>
  )
}

const PatientDashboard = ({patient,user,appointedDoctors}) => {
  console.log(patient)
  const DoctorCard = ({ speciality, name }) => {
    return (
      <div className="p-2 bg-[#ede4ff] dark:bg-darkElevation-300 rounded-md flex items-center space-x-3">
        <div
          className="h-[55px] border-2 border-primary w-[55px] rounded-full"
          style={{
            background: `url(https://res.cloudinary.com/insight-byte/image/upload/v1643459644/unnamed_tqkmtj.jpg) center center/cover`,
          }}
        ></div>
        <div>
          <div>{name}</div>
          <div className="text-gray-600 text-xs">{speciality}</div>
        </div>
      </div>
    );
  };
  const schdulesArray = (patient)=>{
    console.log(patient)
    let arr = [];
    patient.appointments.filter(a=>a.state==='accepted').map(a=>{
      const arr2 = a.schedules.filter(s=>s.state==='future').map(s=>({...s,doctorId : a.doctor.uuid,doctorName : a.doctor.user.fullName, appointmentId : a.id, }))
      arr = [...arr,...arr2]
    });
    return arr;
  }
  const [schedule,setSchedule] = useState(schdulesArray(patient))
  console.log(schedule)
  console.log(schedule)
 
  return (
    <div className="mt-10">
      <div className="flex space-x-10">
        <InfoBox
          title="Doctors Appointed"
          src="/doctorsappointed.png"
          width="400px"
        >
          {appointedDoctors.length>0?appointedDoctors.map(doc=>(
              <DoctorCard name={doc.user.fullName} speciality={`${doc.specialities[0]?.title || 'Unset'} Specialist` || 'Not Found'} />
          )):<div className=" text-gray-600">No Doctor Found</div>}
         
        </InfoBox>

        <InfoBox
          src="/diagnosis.png"
          title="Diagnosis Reports"
          color="pink"
          width="450px"
        >
          {patient.diagnoses.length>0?patient.diagnoses.map(diagnosis=>(
            <div><DianogisCard diagnosis={diagnosis}/></div>
          )):<div className="text-gray-600">No Reports Found</div>}
        </InfoBox>
        <InfoBox
          src="/medicalrecords.png"
          title="Medical Reports"
          color="green"
          width="450px"
          icon={<AiOutlinePlusSquare size={31} className="-mt-1 text-green-600 hover:scale-105" />}
        >
          {patient.medicalRecords.length>0?patient.medicalRecords.map(record=>(
            <a href={record.file} target="true" className='block'><MedicalRecordCard record={record}/></a>
          )):<div className="text-gray-600">No Records Found</div>
          }
        </InfoBox>
      </div>
      <div className="mt-4 flex space-x-10">
          <InfoBox
           src="/appointments.png"
           title="Active Schedules"
           color="royalblue"
           width="600px"
           height={185}
          >

                    
           {schedule.length>0?schedule.map(s=>(
             <div><ScheduleCard schedule={s}/></div>
           )):<div>No Appointments Found</div>}
          </InfoBox>
          <InfoBox
           src="/Prescriptions.png"
           title="Prescriptions"
           color="orange"
           width="600px"
           height={185}
           
          ></InfoBox>
      </div>
    </div>
  );
};

export default PatientDashboard;
