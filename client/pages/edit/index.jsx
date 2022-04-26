import React, { useEffect, useState } from "react";
import BasicInformation from "../../components/EditPage/BasicInformation";
import DoctorDetails from "../../components/EditPage/DoctorInformation";
import PatientDetails from "../../components/EditPage/PatientInformation";
import SecurityDetails from "../../components/EditPage/SecurityInformation";
import Input from "../../components/Input";
import { verifyAuthentication } from "../../utils/verifyAuth";

export const getServerSideProps = async(ctx) => {
  const auth = verifyAuthentication(ctx.req);
  if (!auth.state) {
    return {
      redirect : {
        destination : '/'
      }
    }
  }
  return {props : {user : auth.decodedData}}

};


const Edit = ({user}) => {
  console.log(user)
  const [basicInformation, setBasicInformation] = useState({
    details : {
      fullName : user.fullName,
      email :  user.email,
      contact : user.contact
    },
    error : ''
  })
  const [patientInformation, setPatientInformation] = useState({
    details : {
      age : user.additionalData.age,
      bloodGroup : user.additionalData.bloodGroup,
      medicalHistory : user.additionalData.medicalHistory,
      medicalRecords : user.additionalData.medicalRecords
    },
    error : ''
  })
  return (
    <div className="py-10 w-[70vw] pr-10">
      <div className="text-[#5A5482] font-bold text-xl">Edit Your Profile</div>
      <div className="text-gray-500 text-xs mt-2">
        Tip : Keep your profile complete for better search and accessiblity.
      </div>
      <div className="mt-10 flex space-x-5 items-center ">
        <div className="w-[100px] h-[100px] rounded-full bg-primary"></div>
        <div className="text-black">
          <div>{basicInformation.details.fullName}</div>
          <div className="text-xs mt-1">{basicInformation.details.email}</div>
        </div>
      </div>
      <div className="mt-10 w-fit">
       <BasicInformation userId={user.uuid} information={basicInformation} setInformation={setBasicInformation}/>
      </div>
      <div className="mt-10 w-[500px]">
        {user.role==='doctor'?<DoctorDetails/>:<PatientDetails
        userId={user.additionalData.uuid} information={patientInformation} setInformation={setPatientInformation}
        />}
      </div>
      <div className="mt-10 w-[500px]">
        <SecurityDetails/>
      </div>
    </div>
  );
};

export default Edit;
