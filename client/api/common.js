import axios from './axios';


export const getAppointmentAPI = async (id)=>{
    const res = await axios.get(`/appointments/${id}`);
    return res;
}

export const getAppointmentSchedules = async(id)=>{
    const res = await axios.get(`/appointments/${id}/schedules`);
    return res;
}
export const updateUserDetailsAPI = async (id,formData)=>{
    const res = await axios.put(`/user/${id}`, {changes : formData}, {withCredentials : true});
    return res;
}

export const getAllUserDetailsAPI = async(id)=>{
    const res=  await axios.get(`/user/${id}`,);
    return res;
}

export const createAppointmentAPI = async(patientId,doctorId)=>{
    const res = await axios.post(`/appointments`,{patientId,doctorId});
    return res;

}