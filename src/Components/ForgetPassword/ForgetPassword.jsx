import { useState } from "react";
import { ForgetPasswordUser } from "../../Api";
import { replace, useNavigate } from "react-router-dom";

const ForgetPassword = () =>{
    const [emailId, setEmailId] = useState("");
    const [errorMessage, setErrorMessage] = useState(false);
    const navigate = useNavigate();
    const handleSubmit = async() =>{
        try{
            if(!(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailId))){
                setErrorMessage("Invalid EmailId")
            }else{
                setErrorMessage("");
                const data = await ForgetPasswordUser("forgetpassword", {emailId});
            } 
        }catch(error){
            setErrorMessage(error.response.data.message);
        };
    };

    return (
        <>
            <div className="bg-gray-300 flex h-screen items-center justify-center">
                <div className="bg-white rounded-xl px-6 py-12 w-fit h-[60%] md:h-1/2 flex flex-col items-center gap-10">
                    <span className="text-3xl font-serif">Forget Password</span>
                    <div className="flex flex-col justify-center items-center gap-4 ">
                        <input type="text" placeholder="EmailId" value={emailId} className="border border-1 rounded-md  p-2 border-red-300 w-fit " maxLength="256" onChange={(e) => setEmailId(e.target.value)}/>
                        <span className="text-sm text-red-400">{errorMessage}</span>
                        <button className="bg-blue-300 w-fit px-3 py-2 md:px-4 rounded hover:bg-gray-300" onClick={()=>handleSubmit()}>Submit</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ForgetPassword;