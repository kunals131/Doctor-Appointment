import React from 'react'
import Image from 'next/image'
const PatientDashboard = () => {

    const DoctorCard = ({speciality, name})=>{
        return (
            <div className='p-2 bg-[#ede4ff] rounded-md flex items-center space-x-3'>
            <div className='h-[55px] border-2 border-primary w-[55px] rounded-full' style={{background : `url(https://res.cloudinary.com/insight-byte/image/upload/v1643459644/unnamed_tqkmtj.jpg) center center/cover`}}></div>
            <div>
                <div>{name}</div>
                <div className='text-gray-600 text-xs'>{speciality}</div>
            </div>
        </div>
        )
    }


  return (
    <div className='mt-10'>
        <div className='bg-white w-[400px] p-4'>
            <div className='flex items-center space-x-4'>
                <div>
            <Image src="/doctorsappointed.png" height={65} width={65}></Image>
            </div>
            <div>
                <div className='font-medium text-lg'>Doctors Appointed</div>
                <div className='w-[40%] h-[3px] mt-1 bg-[#FF9074]'> </div>
            </div>
            </div>
            <div className='mt-4 space-y-3 h-[170px] overflow-y-auto'>
                <DoctorCard name="Keith Sebastian" speciality={"Heart Specialist"}/>
                <DoctorCard name="Keith Sebastian" speciality={"Heart Specialist"}/>
            </div>
        </div>
        <div className='mt-5'>
            
        </div>
    </div>
  )
}

export default PatientDashboard