import React, { useState } from "react";
import { addSpecialityAPI, RemoveSpecialityAPI, updateDoctorAPI } from "../../api/doctor";

import diseases from '../../allDiseases.json';
import InputField from "../Input";
import InputAdvance from "../InputAdvance";

const DoctorDetails = ({information,setInformation,userId,tagsList,specialitiesList})=>{
  const handleChange = (e)=>{
    setInformation(prev=>({
      ...prev, details : {...prev.details, [e.target.name] : e.target.value}, error : ''
    }));
  }
  const [specialities,setSpecialities] = useState(specialitiesList);
  const [tags,setTags] = useState(tagsList?.split(',')||[]);
  const handleAddSpecialities = async(title)=>{
    try {
      const res = await addSpecialityAPI(userId,title);
      console.log(res);
      setSpecialities(prev=>[...prev,res.data]);
    }catch(err) {
      console.log(err);
    }
  }
  const handleRemoveSpeciality = async(id)=>{
    try {
      const result = await RemoveSpecialityAPI(userId,id);
      console.log(result);
      setSpecialities(prev=>prev.filter(p=>p.id!==id));
    }catch(err) {
      console.log(err);
      setInformation({...information, error : err.response.data.message})
    }
  }

  const handleAddDisease = async(item)=>{
    const {value : title} = item;
    try {
      const newArr = [...tags, title];
      const newTags =  newArr.join(',');
      const result = await updateDoctorAPI(userId,{tags : newTags});
      setTags([...newArr]);
      console.log(result);
    }catch(err) {
      console.log(err);
      setInformation({...information, error : err.response.data.message})
    }
  };
  const handleRemoveDisease = async(title)=>{

    try {
    const newArr = tags.filter(t=>t!==title);
    const newTags = newArr.join(',');
    const result = await updateDoctorAPI(userId, {tags : newTags});
    console.log(result);
    setTags(newArr);
    }catch(err) {
      console.log(err);
      setInformation({...information, error : err.response.data.message})
    }
  }

  const handleSave = async()=>{
    try {
    const res = await updateDoctorAPI(userId,information.details)
    console.log(information.details)
    console.log(res);
    }catch(err) {
      console.log(err);
      // setInformation({...information, error : err.response.data.message});
    }
  }
    return (
        <>
             <div className="text-[#5A5482] font-bold text-xl flex justify-between w-full">
          <div>Additional Information</div>
          <div onClick={handleSave} className="text-base bg-[#5A5482] px-4 rounded-md py-[2px] hover:scale-105 transition-all cursor-pointer text-white ">Save</div>
        </div>
        <div className="text-gray-500 text-xs mt-2">
          Update Personal Details, Change the details and hit save!
        </div>
        <div>
          
        </div>
        <div className="mt-6 space-y-4 text-black" >
            <div className="flex space-x-3">
            <InputField name="medicalExperience" onChange={handleChange} value={information.details.medicalExperience} label="Medical Experience" width="200px" placeholder={"Medical Experience in Yrs"}/>
            <InputField name="lisenceId" onChange={handleChange} value={information.details.lisenceId} label="Lisense Id" width="100%" placeholder={"Medical Lisense Id"}/>
            </div>
            <InputField name="address" onChange={handleChange} value={information.details.address} label={"Work Address"} width="100%"/>
            <div className="flex space-x-2">
                <InputField name="degree" onChange={handleChange} value={information.details.degree} width="300px" label="Degree"/>
                <InputField name="university" onChange={handleChange} value={information.details.university} width="100%" label="University"/>
            </div>
            <InputAdvance list={tags} handleAdd={handleAddDisease} handleRemove={handleRemoveDisease} options={diseases.filter(d=>(!tags.includes(d))).map(d=>({id : d, value : d}))} width="100%" label="Disease Tags" placeholder="Enter diseases you can treat"/>
            <InputAdvance list={specialities} handleAdd={handleAddSpecialities} handleRemove={handleRemoveSpeciality}   width="100%" label="Speciality" placeholder="Enter your major specialities"/>
        </div>
        </>
    )
    
}

export default DoctorDetails;