import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import { SignUp } from '../../Api';

const Signup = () =>{
    const [name, setName] = useState("");
    const [emailId, setEmailId] = useState("");
    const [password, setPassword] = useState("");
    const [checkName, setCheckName] = useState(false);
    const [checkEmailId, setCheckEmailId] = useState(false);
    const [checkPassword, setCheckPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState(false);
    const navigate = useNavigate();
    const handleClick = async() =>{
        try{
            const isNameValid = /^[A-Za-z]{4,}$/.test(name);
            const isEmailIdValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailId);
            const isPasswordValid = /^[A-Za-z]{8,}$/.test(password);

            setCheckName(!isNameValid);
            setCheckEmailId(!isEmailIdValid);
            setCheckPassword(!isPasswordValid);

            if (isNameValid && isEmailIdValid && isPasswordValid) {
                const data = await SignUp("signup", { name, emailId, password });
                navigate('/login');
            }

        }catch(error){
            error.response.data.code === 409?setErrorMessage(error.response.data.message):<></>;
        }
    };


    return (
        <>
            <div className="flex items-center justify-center bg-gray-100 h-screen">
                <div className="bg-white rounded-lg flex flex-col gap-6 p-10 md:px-2 lg:py-10 lg:px-2 w-fit md:w-1/3 lg:w-1/4  items-center justify-center">
                    <div className="flex justify-center text-2xl font-serif">
                        Hi, SignUp Here!          
                    </div>
                    <div className="flex flex-col gap-2 w-48">
                        <input type="text" className="border border-1 border-red-400 rounded p-2 placeholder-gray-300" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)}/>
                        {checkName?<span className='text-xs text-left'>Name must be at least 4 letters and only alphabets.</span>:<></>}
                        <input type="text" className="border border-1 border-red-400 rounded p-2 placeholder-gray-300" placeholder="EmailId" value={emailId} onChange={(e) => setEmailId(e.target.value)}/>
                        {checkEmailId?<span className='text-xs text-center'>EmailId must contain min 4 letters.</span>:<></>}
                        <input type="text" className="border border-1 border-red-400 rounded p-2 placeholder-gray-300" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                        {checkPassword?<span className='text-xs text-left'>"Password must include letters, numbers, special characters, and be at least 8 characters long."</span>:<></>}
                    </div>
                    <div className='flex flex-col gap-1'>
                        <span className='text-sm text-center text-red-400'>{errorMessage}</span>
                        <span className='text-xs text-right'>Already signed up?   
                            <span className='text-xs text-blue-300 text-right cursor-pointer' onClick={() => navigate('/login')}> Click here</span>
                        </span>
                    </div>
                    <button className="bg-blue-400 rounded p-2 text-white w-24 hover:bg-gray-400 " onClick={handleClick}>Submit</button>
                </div>
            </div>
        </>
    )
}

export default Signup;