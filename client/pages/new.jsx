import React, { useEffect, useState } from "react";
import Image from "next/image";
import FillImage from "../public/fill.png";
import cls from "classnames";
import diseases from '../allDiseases.json';
import { FaFileUpload } from "react-icons/fa";
import { HiArrowSmRight } from "react-icons/hi";
import {
  AiOutlineEdit,
  AiOutlineFileAdd,
  AiOutlineFileDone,
  AiOutlineDelete,
} from "react-icons/ai";
import { BsPlusCircleDotted } from "react-icons/bs";
import { MdClear } from "react-icons/md";
import PatientDetails from "../components/NewComponent/PatientComponent";


import MedicalRecord from "../components/MedicalRecord";
import InputAdvance from "../components/InputAdvance";
import InputField from "../components/Input";
import { verifyAuthentication } from "../utils/verifyAuth";
import { useRouter } from "next/router";
import { addSpecialityAPI, RemoveSpecialityAPI, updateDoctorAPI } from "../api/doctor";
import { updateUserDetailsAPI } from "../api/common";
import { useDispatch } from "react-redux";
import { updateUser } from "../redux/actions/user";



export const getServerSideProps = async(ctx) => {
  const auth = verifyAuthentication(ctx.req);
  if (!auth.state) {
    return {
      redirect : {
        destination : '/',
        permanent : false
      }
    }
  }
  if(!auth.decodedData.isNew) return {
    redirect : {
      destination : '/',
      permanent : false
    }
  } 
  
  return {
    props : {user : auth.decodedData}
  }


 try {
     
 }catch(err) {
     console.log(err);
     return {
         notFound : true
     }
 }
};





const DoctorDetails = ({user})=>{
  const [information, setInformation] = useState({
  
      medicalExperience: user.additionalData.medicalExperience,
      lisenceId: user.additionalData.lisenceId,
      university: user.additionalData.university,
      degree: user.additionalData.degree,
      address: user.additionalData.address,
    
  });

  const handleChange = (e)=>{
    setInformation(prev=>({
      ...prev,[e.target.name] : e.target.value}
    ));
  }
  const router = useRouter();

  const [specialities,setSpecialities] = useState(user.additionalData.specialities);

  const [tags,setTags] = useState(user.additionalData.tags?.split(',')||[]);
  const check = ()=>{
    const arr = Object.values(information);
    if (specialities.length===0) return true;
    if (arr.includes('')) return true;
    if (tags.length===0) return true;
    return false;
  }
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
      // setInformation({...information, error : err.response.data.message})
    }
  }

  const handleAddDisease = async(item)=>{
    const {value : title} = item;
    try {
      const newArr = [...tags, title];
      const newTags =  newArr.join(',');
      const result = await updateDoctorAPI(user.additionalData.uuid,{tags : newTags});
      setTags([...newArr]);
      console.log(result);
    }catch(err) {
      console.log(err);
      
    }
  };
  const handleRemoveDisease = async(title)=>{

    try {
    const newArr = tags.filter(t=>t!==title);
    const newTags = newArr.join(',');
    const result = await updateDoctorAPI(user.additionalData.uuid, {tags : newTags});
    console.log(result);
    setTags(newArr);
    }catch(err) {
      console.log(err);
      
    }
  }

  const handleSave = async()=>{
    try {
    const res = await updateDoctorAPI(user.additionalData.uuid,information)
    const res2 = await updateUserDetailsAPI(user.uuid, {isNew : false})
    console.log(res2)
    console.log(information)
    console.log(res);
    router.push('/');

    }catch(err) {
      console.log(err);
      // setInformation({...information, error : err.response.data.message});
    }
  }
    return (
        <>
         <div className="text-[#5A5482] font-bold text-xl">
          Complete your profile
        </div>
        <div className="text-gray-500 text-xs mt-2">
          Let your patients know how you can treat them the best.
        </div>
        <div className="mt-6 space-y-3">
            <div className="flex space-x-3">
            <InputField value={information.medicalExperience} onChange={handleChange} name="medicalExperience" label="Medical Experience" width="200px" placeholder={"Medical Experience in Yrs"}/>
            <InputField value={information.lisenceId} onChange={handleChange} label="Lisense Id" name="lisenceId" width="100%" placeholder={"Medical Lisense Id"}/>
            </div>
            <InputField value={information.address} onChange={handleChange} name="address" label={"Work Address"} width="100%"/>
            <div className="flex space-x-2">
                <InputField value={information.degree} onChange={handleChange} width="300px" name="degree" label="Degree"/>
                <InputField value={information.university} onChange={handleChange} width="100%" name="university" label="University"/>
            </div>
            <InputAdvance list={tags} handleAdd={handleAddDisease} handleRemove={handleRemoveDisease} options={diseases.filter(d=>(!tags.includes(d))).map(d=>({id : d, value : d}))} width="100%" label="Disease Tags" placeholder="Enter diseases you can treat"/>
            <InputAdvance list={specialities} handleAdd={handleAddSpecialities} handleRemove={handleRemoveSpeciality}   width="100%" label="Speciality" placeholder="Enter your major specialities"/>
        </div>
        <div className="mt-8 flex space-x-3 justify-end">
               <button  className="border-[#6757E5] bg-transparent disabled:bg-opacity-70 text-[#6757E5] border-2 hover:scale-105 transition-all ease-out text-sm px-2 py-2 rounded-md">Detect Location</button>
              <button onClick={handleSave}   className="bg-[#6757E5] disabled:bg-opacity-70 text-white text-sm px-2 py-2 rounded-md">Save and Continue</button>
          </div>
        </>
    )
}

const AdditionalDetails = ({user}) => {
  const dispatch=  useDispatch();
  useEffect(()=>{
    dispatch(updateUser(user));
  }, [])
  console.log(user)
  return (
    <div className="h-[100vh] overflow-hidden bg-white w-full flex">
      <div className="h-full overflow-y-auto scrollbar w-[60vw] px-20 pt-16 pb-8">
         {user.role==='doctor'?<DoctorDetails user={user}/>:<PatientDetails user={user}/>}
        
      </div>
      <div className="h-full flex items-center bg-[#F5F7FB] w-[40vw]">
        <Image src={FillImage} />
      </div>
    </div>
  );
};

export default AdditionalDetails;
