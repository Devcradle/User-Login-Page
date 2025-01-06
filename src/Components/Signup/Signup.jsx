import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import { SignUp } from '../../utils/Api';
import './Signup.scss';

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
            const isNameValid = /^[A-Za-z]+(\s[A-Za-z]+)*$/.test(name);
            const isEmailIdValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailId);
            const isPasswordValid = /^[A-Za-z0-9!@#$%^&*(),.?":{}|<>]{8,}$/.test(password);
            console.log(isNameValid, isEmailIdValid, isPasswordValid)
            setCheckName(!isNameValid);
            setCheckEmailId(!isEmailIdValid);
            setCheckPassword(!isPasswordValid);

            if (isNameValid && isEmailIdValid && isPasswordValid) {
                await SignUp("signup", { name, emailId, password });
                navigate('/login');
            }

        }catch(error){
            error.response.data.code === 409?setErrorMessage(error.response.data.message):<></>;
        }
    };


    return (
        <>
            <div className="signup-maindiv-cnt">
                <div className="signup-subdiv-cnt">
                    <div className="signup-div1-cnt">
                        Hi, SignUp Here!          
                    </div>
                    <div className="signup-div2-cnt">
                        <input type="text" className="signup-input1-cnt" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)}/>
                        {checkName?<span className='signup-span1-cnt'>Name must be at least 4 letters and only alphabets.</span>:<></>}
                        <input type="text" className="signup-input2-cnt" placeholder="EmailId" value={emailId} onChange={(e) => setEmailId(e.target.value)}/>
                        {checkEmailId?<span className='signup-span2-cnt'>EmailId must contain min 4 letters.</span>:<></>}
                        <input type="text" className="signup-input2-cnt" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                        {checkPassword?<span className='signup-span3-cnt'>"Password must include letters, numbers, special characters, and be at least 8 characters long."</span>:<></>}
                    </div>
                    <div className='signup-div3-cnt'>
                        <span className='signup-span4-cnt'>{errorMessage}</span>
                        <span className='signup-span5-cnt'>Already signed up?   
                            <span className='signup-span6-cnt' onClick={() => navigate('/login')}> Click here</span>
                        </span>
                    </div>
                    <button className="signup-button1-cnt" onClick={handleClick}>Submit</button>
                </div>
            </div>
        </>
    )
}

export default Signup;