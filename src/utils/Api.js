import axios from "axios";


const getAuth = () =>{
    return `Bearer ${localStorage.getItem("ref")}`;
};

export const SignUp = async(endpoint, payload) =>{
    try{
        return (
            await axios.post(`${process.env.REACT_APP_BASE_URL}/${endpoint}`, payload )
        );
    }catch(error){
        console.error(error);
    }
};

export const LoginUser = async(endpoint, payload) =>{
    try{

        return (
            await axios.post(`${process.env.REACT_APP_BASE_URL}/${endpoint}`, payload)
        );
    }catch(error){
        console.error(error);
    }
};

export const GetAdmin = async(endpoint) => {
    try{

        return (
            await axios.get(`${process.env.REACT_APP_BASE_URL}/${endpoint}`, {
                headers: {
                    Authorization: getAuth()
                }
            })        
        )
    }catch(error){
        console.error(error);
    }
};

export const EditAdmin = async(endpoint, payload) => {
    try{

        return (
            await axios.put(`${process.env.REACT_APP_BASE_URL}/${endpoint}`, payload, {
                headers: {
                    Authorization: getAuth()
                }
            })
        )
    }catch(error){
        console.error(error);
    }
}

export const ForgetPasswordUser = async(endpoint, payload) =>{
    try{

        return (
            await axios.post(`${process.env.REACT_APP_BASE_URL}/${endpoint}`, payload)
        );
    }catch(error){
        console.error(error);
    }
}

export const ResetPasswordUser = async(endpoint, payload) =>{
    try{

        return (
            await axios.put(`${process.env.REACT_APP_BASE_URL}/${endpoint}`, payload)
        );
    }catch(error){
        console.error(error);
    }
}



export const CreateUser_ = async(endpoint, payload) =>{
    try{

        return (
            await axios.post(`${process.env.REACT_APP_BASE_URL_USER}/${endpoint}`, payload, {
                headers: {
                    Authorization: getAuth()
                }
            })
        );
    }catch(error){
        console.error(error);
    }
};

export const EditUser_ = async(endpoint, payload) =>{
    try{
        return (
            await axios.put(`${process.env.REACT_APP_BASE_URL_USER}/${endpoint}`, payload, {
                headers: {
                    Authorization: getAuth()
                }
            })
        );
    }catch(error){
        console.log(error);
    }
};

export const GetUser = async(endpoint) =>{
    try{

        return (
            await axios.get(`${process.env.REACT_APP_BASE_URL_USER}/${endpoint}`, {
                headers: {
                    Authorization: getAuth()
                }
            })
        );
    }catch(error){
        console.error(error);
    }
};

export const GetAllUsers = async(endpoint) =>{
    try{
        return (
            await axios.get(`${process.env.REACT_APP_BASE_URL_USER}/${endpoint}`, {
                headers: {
                    Authorization: getAuth()
                }
            })
        );
    }catch(error){
        console.error(error);
    }
};

