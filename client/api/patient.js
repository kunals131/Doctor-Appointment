import axios from './axios';

export const allPatientDetailsAPI = async(id)=>{
    const res = await axios.get(`/patient/${id}`);
    return res;
}

export const getAllAppointedDoctors = async(id)=>{
    const res= await axios.get(`/patient/${id}/appointeddoctors`);
    return res;
}