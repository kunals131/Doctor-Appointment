import axios from './axios';
import Axios from 'axios';

export const allPatientDetailsAPI = async(id)=>{
    const res = await axios.get(`/patient/${id}`);
    return res;
}

export const getAllAppointedDoctors = async(id)=>{
    const res= await axios.get(`/patient/${id}/appointeddoctors`);
    return res;
}

export const getDiagnosis = async(symptoms)=>{
    const formData = new FormData();
    formData.append('symptoms', symptoms);
    const res = await Axios.post('http://localhost:3002/predict', formData)
    return res;
}

export const createPatientDiagnosis = async(data)=>{
    const res = await axios.post('/diagnosis', {...data});
    return res;
}

export const getDiagnosisData = async(id)=>{
    const res = await axios.get(`/diagnosis/${id}`);
    return res;
}

export const getAllAppointments = async(id)=>{
    const res = await axios.get(`/patient/${id}/appointments`);
    return res;
}

export const updatePatientDetailsAPI = async(id,formData)=>{
    const res = await axios.put(`/patient/${id}`, {changes : formData})
    return res;
}

export const updateMedicalRecordAPI = async(id,formData)=>{
    const res = await axios.put(`/records/${id}`, {...formData});
    return res;
}