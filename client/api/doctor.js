import axios from "./axios";


export const getDoctorStatsAPI = async (id)=>{
    const res = await axios.get(`/doctor/${id}/stats`);
    return res;
}
export const getDoctorDetailsAPI = async(id)=>{
    const res = await axios.get(`/doctor/${id}`);
    return res;
}

export const getDoctorAppointmentsAPI = async(id)=>{
    const res = await axios.get(`/doctor/${id}/appointments`);
    return res;
}

export const updateAppointmentAPI = async(id,updates)=>{
    const res = await axios.put(`/appointments/${id}`, {...updates});
    return res;
}

export const updateDoctorAPI = async(id,formData)=>{
    const res = await axios.put(`/doctor/${id}`, {changes : formData});
    return res;
}

export const getDoctorsAPI = async(keywords,accuracy=0)=>{
    const res = await axios.get(`/search/doctors?keywords=${keywords}&accuracy=${accuracy}`);
    return res;
}