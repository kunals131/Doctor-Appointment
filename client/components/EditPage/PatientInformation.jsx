import React, { useState } from "react";


import cls from "classnames";

import { BsPlusCircleDotted } from "react-icons/bs";

import InputField from "../Input";
import InputAdvance from "../InputAdvance";
import MedicalRecord from "../MedicalRecord";
import { updatePatientDetailsAPI } from "../../api/patient";


const PatientDetails = ({information,setInformation, userId})=>{
  const {age,medicalHistory, bloodGroup} = information.details;
  console.log(age);
  const handleChange = (e)=>{
    setInformation(prev=>({
      ...prev, details : {...prev.details, [e.target.name] : e.target.value}, error : ''
    }));
   
  }
  const handleSave = async(e)=>{
    if (!information.age || !information.medicalHistory || !information.bloodGroup) setInformation({...information, error : 'Something went wrong!'});
    // console.log(save)
    console.log(information)
    try {
    const res = await updatePatientDetailsAPI(userId, information.details);
    console.log(res);
    } catch(err) {
      console.log(err);
      setInformation({...information, error : err.response.data.message})
    }
  }
  const {error} = information;
    return (
        <>
             <div className="text-[#5A5482] font-bold text-xl flex justify-between w-full">
          <div>Additional Information</div>
          <div onClick={handleSave} className="text-base bg-[#5A5482] px-4 rounded-md py-[2px] hover:scale-105 transition-all cursor-pointer text-white ">Save</div>
        </div>
        <div className="text-gray-500 text-xs mt-2">
          {error?error:'Update Personal Details, Change the details and hit save.'}
        </div>
        <div>
          
        </div>
        <div className="mt-6 text-gray-800">
          <div className="flex space-x-4 items-center">
            <InputField type="number" name="age" value={age} width="100px" label="AGE *" onChange={handleChange} />
            <InputField type="number" name="medicalHistory" value={medicalHistory} onChange={handleChange} width="270px" label="Medical History *" />
            <InputField name="bloodGroup" value={bloodGroup} onChange={handleChange} width="100px" label="Blood Group *" />
          </div>
          <div className="mt-4 space-y-4">
            <InputAdvance label="Symptoms" />
            <InputAdvance
              label="Medications"
              placeholder=" Eg : Crosin / 3 in a day / ongoing "
            />
          </div>
          <div className="mt-10">
            <div className="text-[#5A5482] font-bold text-xl flex justify-between w-full">
              <div>Medical Records</div>
              <div className="text-base bg-[#5A5482] px-4 rounded-md py-[2px] hover:scale-105 transition-all cursor-pointer text-white ">Save</div>
            </div>
            <div className="text-gray-500 text-xs mt-2">
              These Medical Records will be shown to the doctor for better
              accessment.
            </div>
            <div className="mt-10 grid grid-cols-2 text-gray-800 gap-4 grid-flow-row">
              <MedicalRecord />
              <MedicalRecord />
              <div className="w-full hover:border-[#6757E5] transition-all ease-in-out group border-gray-400 flex flex-col items-center justify-center h-full border-2 border-dashed rounded-md">
                <div>
                  <BsPlusCircleDotted
                    size={40}
                    className="text-gray-300 group-hover:text-[#6757E5] transition-all ease-linear"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        </>
    )
}

export default PatientDetails;