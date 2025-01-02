import { useState } from "react";
import { ResetPasswordUser } from "../../utils/Api";

const ResetPassword = () =>{
    const [password, setPassword] = useState("");
    const id = window.location.search.substring(1);
    const [message, setMessage] = useState("");
    const handleReset = async(e) => {
        try{
            e.preventDefault();
            setMessage("");
            const data = await ResetPasswordUser(`resetPassword/${id}`, {password});
            setPassword("");
            setMessage(data.data.message);
        }catch(err){
            console.log(err);
            setMessage(err.response.data.message);
        }
    }
    return (
        <>
            <div className="bg-gray-300 h-screen flex items-center justify-center">
                <form >
                <div className="flex flex-col rounded-lg bg-white px-6 py-16 md:px-8 gap-8 justify-center items-center">
                    <span className="text-3xl font-serif">Reset Password</span>
                    <div className="flex flex-col gap-4 justify-center w-44">
                        <input type="password" placeholder="Password" className="border border-1 border-red-300 rounded p-2" maxLength="256" value={password} onChange={(e) => setPassword(e.target.value)}/>
                    </div>
                    <button className="py-2 px-4 text-white bg-blue-300 rounded-md hover:bg-gray-300" onClick={(e) => handleReset(e)}>Reset</button>
                    <span className="text-red-500 tracking-wide w-fit">{message}</span>
                </div>
                </form>
            </div>
        </>
    );
};

export default ResetPassword;