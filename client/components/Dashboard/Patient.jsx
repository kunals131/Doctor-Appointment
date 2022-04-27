import React, { useState } from "react";
import {AiOutlinePlusSquare} from "react-icons/ai";
import Image from "next/image";


import InfoBox from "./InfoBox";

const PatientDashboard = ({patient,user,appointedDoctors}) => {
  const DoctorCard = ({ speciality, name }) => {
    return (
      <div className="p-2 bg-[#ede4ff] rounded-md flex items-center space-x-3">
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
 
  return (
    <div className="mt-10">
      <div className="flex space-x-10">
        <InfoBox
          title="Doctors Appointed"
          src="/doctorsappointed.png"
          width="400px"
        >
          {appointedDoctors.length>0?appointedDoctors.map(doc=>(
              <DoctorCard name={doc.user.fullName} speciality={`${doc.specialities[0].title} Specialist` || 'Not Found'} />
          )):<div className=" text-gray-600">No Doctor Found</div>}
         
        </InfoBox>

        <InfoBox
          src="/diagnosis.png"
          title="Diagnosis Reports"
          color="pink"
          width="450px"
        >
          {patient.diagnoses.length>0?patient.diagnoses.map(diagnosis=>(
            <div>{diagnosis.title}</div>
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
            <a href={record.file} target="true" className='block'>{record.title}</a>
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
             <div>{s.title}</div>
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
