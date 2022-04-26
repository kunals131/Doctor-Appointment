import React from 'react'
import Input from '../Input'
import { updateUserDetailsAPI } from '../../api/common'


const BasicInformation = ({information,setInformation, userId}) => {
  const {details,error} = information
  const handleChange = (e)=>{
    setInformation(prev=>({
      ...prev, details : {...prev.details, [e.target.name] : e.target.value}, error : ''
    }));
  }
  const {fullName,email,contact} = details
  const handleSave = async()=>{
    if (!fullName || !email || !contact) return setInformation({...information, error : 'Some Fields are invalid'})
    try {
    const result = await updateUserDetailsAPI(userId,{fullName,email,contact})
    console.log(result)
    }catch(err) {
      console.log(err);
      setInformation({...information, error : err.response.data.message})
    }
  }
  return (
    <>
         <div className="text-[#5A5482] font-bold text-xl flex justify-between w-full">
          <div>Basic Information</div>
          <div className="text-base bg-[#5A5482] px-4 rounded-md py-[2px] hover:scale-105 transition-all cursor-pointer text-white" onClick={handleSave}>Save</div>
        </div>
        <div className={`${error?'text-red-600':'text-gray-500'} text-xs mt-2`}>
          {error?error:'Update Personal Details, Change the details and hit save'}
        </div>
        <div className="mt-5">
          <Input onChange={handleChange} value={details.fullName} name="fullName" label="Full Name" width="500px" />
          <Input onChange={handleChange} value={details.email} name="email" label="Email" width="500px" />
          <Input onChange={handleChange} value={details.contact} name="contact" label="Phone Number" width="500px" />
        </div>
        
    </>
  )
}

export default BasicInformation