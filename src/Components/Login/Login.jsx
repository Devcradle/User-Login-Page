import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginUser } from "../../utils/Api";

const Login = () =>{
    // kumar0238@gmail.com
    // Change@2024
    const navigate = useNavigate();
    const [emailId, setEmailId] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    
    const handleClick = async() =>{
        try{
            if(!(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailId))){
                setErrorMessage("EmailId not valid");
            }else if(password){
                setErrorMessage("");
                const data = await LoginUser("login", { emailId, password });
                navigate('/home/welcome');
                localStorage.setItem("ref", data?.data?.data?.token);
                localStorage.setItem("name", data?.data?.data?.name);
            }else if(!password){
                setErrorMessage("");
            };
        }catch(error){
            (error.response.data.code === 404 || error.response.data.code === 400) ? setErrorMessage(error.response.data.message):setErrorMessage("");
        }
    };

    return (
        <>
            <div className="flex items-center justify-center h-screen bg-gray-100 ">
                <div className="flex flex-col gap-6 bg-white h-fit w-fit py-10 px-3  rounded-lg text-gray-600 items-center">
                    <span className="text-2xl font-serif">Login Here!</span>
                    <div className="flex gap-4 flex-col">
                        <input type="text" className="border border-1 border-red-400 rounded p-2 placeholder-gray-300 " maxLength="256" placeholder="EmailId" value={emailId} onChange={(e) => setEmailId(e.target.value)}/>
                        <div className="flex gap-2 flex-col">
                            <input type="password" className="border border-1 border-red-400 rounded p-2 placeholder-gray-300" maxLength="256" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                            <span className="text-xs text-left text-blue-500 px-1 w-4 md:w-full cursor-pointer" onClick={() => navigate("/forgetpwd")}>Forget Password</span>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2 items-center">
                        <span className="text-center text-sm text-red-400">{errorMessage}</span>
                        <button className="bg-blue-400 rounded p-2 text-white w-24 hover:bg-gray-400" onClick={handleClick}>Submit</button>
                    </div>
                    <div className="px-6 text-sm">
                        <span className="font-sans">Don't have an account!</span>
                        <span className=" text-blue-500 cursor-pointer " onClick={() => navigate("/", {replace: true})}> SignUp here</span>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login;