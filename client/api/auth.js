import axios from "./axios";


export const loginAPI = async (formData)=>{
    const res = await axios.post('/auth/login', formData, {withCredentials : true});
    return res;
}

export const registerAPI = async(formData)=>{
    const res = await axios.post('/auth/register', formData);
    return res;
}

export const logoutAPI = async()=>{
    const res = await axios.get('/auth/logout', {withCredentials : true});
    return res;
}

export const verifyAuthAPI = async()=>{
    const res = await axios.get('/auth/verify');
    return res;
}

