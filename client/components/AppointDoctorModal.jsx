import React, { useState } from 'react'
import Modal from './Modal';
import Input from './Input';
import { createAppointmentAPI } from '../api/common';
const AppointDoctorModal = ({show,onClose, doctorId, patientId, doctorName}) => {
    const [message,setMessage] = useState('');
    const handleRequest = async()=>{
        console.log(doctorId, patientId,message)
        try {
            const res = await createAppointmentAPI(patientId, doctorId);
            console.log(res);
            onClose();
        }catch(err) {
            console.log(err.response.data.message);
        }
    }
  return (
    <Modal title={"Request Appointment"} show={show} onClose={onClose}>
        <div className='text-sm'>
            <Input label="Add Message" value={message} onChange={(e)=>setMessage(e.target.message)} placeholder="Add a request Message"/>
            <div className='mt-10 text-xs text-gray-600'>By Sending this request, doctor will be able to see your profile.</div>
            <div onClick={handleRequest} className='mt-3'><button className='px-2 py-1 bg-primary text-white rounded-md'>Send Request</button></div>
        </div>
    </Modal>
  )
}

export default AppointDoctorModal