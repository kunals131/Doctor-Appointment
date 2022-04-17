import axios from './axios';


export const getAppointmentAPI = async (id)=>{
    const res = await axios.get(`/appointments/${id}`);
    return res;
}
export const getAppointmentSchedules = async(id)=>{
    const res = await axios.get(`/appointments/${id}/schedules`);
    return res;
}