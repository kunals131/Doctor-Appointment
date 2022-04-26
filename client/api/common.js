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

