import { loginAPI, registerAPI } from "../../api/auth"
import { USER_ACTIONS } from "../actionTypes";

export const loginUser = (formData, setLoading, setError, router)=>async(dispatch)=>{
    try {
        setLoading(true);
        const result = await loginAPI(formData)
        console.log(result.data);
        dispatch({
            type : USER_ACTIONS.LOGIN_USER,
            payload : result.data
        });
        router.push('/dashboard');
        setLoading(false)
    }catch(err) {
        console.log(err);
        setLoading(false)

        setError(err.response?.data?.message)
    }
}

export const registerUser = (formData, setLoading, setError, router)=>async(dispatch)=>{
    try {
        setLoading(true);
        const result = await registerAPI(formData);
        const data = result.data;
        return loginUser({email : formData.email, password : formData.password}, setLoading, setError,router);
    }catch(err) {
        console.log(err);
        setLoading(false);
        setError(err.response?.data?.message);
    }
}