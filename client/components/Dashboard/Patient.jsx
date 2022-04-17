import React from "react";
import {AiOutlinePlusSquare} from "react-icons/ai";
import Image from "next/image";


import InfoBox from "./InfoBox";











const PatientDashboard = () => {
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

 
  return (
    <div className="mt-10">
      <div className="flex space-x-10">
        <InfoBox
          title="Doctors Appointed"
          src="/doctorsappointed.png"
          width="400px"
        >
          <DoctorCard name="Keith Sebastian" speciality={"Heart Specialist"} />
          <DoctorCard name="Keith Sebastian" speciality={"Heart Specialist"} />
        </InfoBox>

        <InfoBox
          src="/diagnosis.png"
          title="Diagnosis Reports"
          color="pink"
          width="450px"
        >
          <div className="text-gray-600">No Reports Found</div>
        </InfoBox>
        <InfoBox
          src="/medicalrecords.png"
          title="Medical Reports"
          color="green"
          width="450px"
          icon={<AiOutlinePlusSquare size={31} className="-mt-1 text-green-600 hover:scale-105" />}
        >
          <div className="text-gray-600">No Records Found</div>
        </InfoBox>
      </div>
      <div className="mt-4 flex space-x-10">
          <InfoBox
           src="/appointments.png"
           title="Active Schedules"
           color="royalblue"
           width="600px"
           height={185}
        
           
          ></InfoBox>
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
