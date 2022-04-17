import React, { useState } from 'react'
import {HiOutlinePlusSm} from 'react-icons/hi';
import {AiOutlineVideoCamera} from 'react-icons/ai';
import {FaFileMedicalAlt, FaFilePrescription, FaNotesMedical} from 'react-icons/fa';
import {MdStickyNote2} from 'react-icons/md';

const MessageInput = ()=>{
    const [focus,setFocus] = useState(false);
    return (
        <div className={`w-full bg-[#222529] rounded-lg ${focus?'border-[#3f444a]':'border-[#1C1F23]'} p-2  border-2`}>
            <textarea onFocus={()=>setFocus(true)} placeholder="Send Message" onBlur={()=>setFocus(false)}  className='w-full placeholder:text-slate-600 p-3 bg-[#222529] text-slate-300 text-xs  rounded-md outline-none'/>
            <div className='flex space-x-3'>
                <div title='Send File' className='p-[6px]  hover:bg-[#40454b]  rounded-full bg-[#2d3135]'><HiOutlinePlusSm className='text-slate-400'/></div>
                <div  className='w-[1px]  hover:bg-[#40454b] bg-[#2d3135]'></div>
                <div title='Schedule Meeting' className='p-[6px] hover:bg-[#40454b]  rounded-full bg-[#2d3135]'><AiOutlineVideoCamera className='text-slate-400'/></div>
                <div title='Write Prescription' className='p-[6px]  hover:bg-[#40454b] rounded-full bg-[#2d3135]'><FaNotesMedical className='text-slate-400'/></div>
                <div title='Add Message To Notes' className='p-[6px]  hover:bg-[#40454b] rounded-full bg-[#2d3135]'><MdStickyNote2 className='text-slate-400'/></div>
            </div>
        </div>
    )
}

const MessageBox = ()=>{
    return (
        <div className='p-2  hover:bg-[#222529]'>
            <div className='flex justify-start space-x-4'>
                <div className='bg-primary h-[50px] w-[50px] rounded-md'></div>
                <div className=''>
                    <div className='flex space-x-2 items-center'>
                        <div className='font-semibold text-sm text-slate-300'>Priya Sharma</div>
                        <div className='text-slate-500 text-xs'>2:58 PM</div>
                    </div>
                    <div className='mt-2 font-light text-white text-xs'>hello WOrld</div>
                </div>
            </div>
        </div>
    )
}

const Conversation = () => {
  return (
    <div className='flex flex-col justify-between h-full  items-center'>
        <div className='w-full h-[520px] overflow-y-scroll p-3 flex  flex-col-reverse '>
        <MessageBox/>
        <MessageBox/>
        <MessageBox/>
        <MessageBox/>
        <MessageBox/>
        <MessageBox/>
        
       
        </div>
        <div className='w-full p-3'>
        <MessageInput/>
        </div>
    </div>
  )
}

export default Conversation