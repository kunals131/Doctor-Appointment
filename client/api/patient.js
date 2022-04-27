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

export const addSymptomsAPI = async(patientId, title)=>{
    const res = await axios.post(`/patient/${patientId}/symptoms`, {title});
    return res;
}

export const removeSymptomAPI = async(patientId,smpId)=>{
    const res = await axios.delete(`/patient/${patientId}/symptoms/${smpId}`);
    return res;
}

export const addMedicationAPI = async(patientId,data)=>{
    const res = await axios.post(`/patient/${patientId}/medications`, {data});
    return res;
}

export const deleteMedicationAPI = async(patientId,medId)=>{
    const res = await axios.delete(`/patient/${patientId}/medications/${medId}`);
    return res;
}