import axios from "axios";

const BASE_URL = "http://localhost:3000/api/v1/admin";
const BASE_URL_USER = "http://localhost:3000/api/v1/users"

const getAuth = () =>{
    return `Bearer ${localStorage.getItem("ref")}`;
};

export const SignUp = async(endpoint, payload) =>{
    return (
       await axios.post(`${BASE_URL}/${endpoint}`, payload )

    );
};

export const LoginUser = async(endpoint, payload) =>{
    return (
        await axios.post(`${BASE_URL}/${endpoint}`, payload)
    );
};

export const GetAdmin = async(endpoint) => {
    return (
        await axios.get(`${BASE_URL}/${endpoint}`, {
            headers: {
                Authorization: getAuth()
            }
        })        
    )
};

export const EditAdmin = async(endpoint, payload) => {
    return (
        await axios.put(`${BASE_URL}/${endpoint}`, payload, {
            headers: {
                Authorization: getAuth()
            }
        })
    )
}

export const ForgetPasswordUser = async(endpoint, payload) =>{
    return (
        await axios.post(`${BASE_URL}/${endpoint}`, payload)
    );
}

export const ResetPasswordUser = async(endpoint, payload) =>{
    return (
        await axios.post(`${BASE_URL}/${endpoint}`, payload)
    );
}



export const CreateUser_ = async(endpoint, payload) =>{
    return (
        await axios.post(`${BASE_URL_USER}/${endpoint}`, payload, {
            headers: {
                Authorization: getAuth()
            }
        })
    );
}

export const EditUser_ = async(endpoint, payload) =>{
    return (
        await axios.put(`${BASE_URL_USER}/${endpoint}`, payload, {
            headers: {
                Authorization: getAuth()
            }
        })
    );
};

export const GetUser = async(endpoint) =>{
    return (
        await axios.get(`${BASE_URL_USER}/${endpoint}`, {
            headers: {
                Authorization: getAuth()
            }
        })
    );
};

export const GetAllUsers = async(endpoint) =>{
    return (
        await axios.get(`${BASE_URL_USER}/${endpoint}`, {
            headers: {
                Authorization: getAuth()
            }
        })
    );
};

