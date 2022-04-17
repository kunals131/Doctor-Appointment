import React from 'react'
import DoctorProfile from "../../components/DoctorCard";

const Diagnose = () => {
  return (
    <div className='mt-12 flex justify-between px-10'>
        <div>
        <div className='text-xl font-semibold'>Diagnosis Report</div>

        <div className='mt-8'>
            <div className='font-medium'>Diagnosis</div>
            <div className='mt-2 text-sm'>
            <div><span className='font-semibold'>Predicted Disease : </span>Fungal Infection</div>
                <div><span className='font-semibold'>Accuracy : </span>92%</div>
                <div><span className='font-semibold'>Doctors Found </span>32</div>
               
            </div>
        </div>

        <div className='mt-8'>
            <div className='font-medium'>Patient Details</div>
            <div className='mt-2 text-sm'>
                <div><span className='font-semibold'>Name : </span>Kunal Sangtiani</div>
                <div><span className='font-semibold'>Age : </span>32</div>
                <div><span className='font-semibold'>Medical History : </span>2 Years</div>
            </div>
        </div>
        <div className='mt-8'>
            <div className='font-medium'>Symptoms</div>
            <div className='mt-2 text-sm'>
                <div>1. Fever</div>
                <div>2. Sick</div>
            </div>
        </div>
        </div>
        <div className='w-[700px] '>
            <div className=' text-lg font-semibold'>Recommended Doctors</div>
            <div className='text-xs'>32 Doctors Found</div>
            <div className='mt-4 space-y-5 h-[400px] overflow-y-auto'>
                <DoctorProfile/>
                <DoctorProfile/>
                <DoctorProfile/>
                <DoctorProfile/>
            </div>
        </div>
       
    </div>
  )
}

export default Diagnose