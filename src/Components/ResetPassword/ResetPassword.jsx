import { useState } from "react";
import { ResetPasswordUser } from "../../utils/Api";
import './ResetPassword.scss';

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
            setMessage(data?.data?.message);
        }catch(err){
            console.log(err);
            setMessage(err.response.data.message);
        }
    }
    return (
        <>
            <div className="resetPwd-maindiv-cnt">
                <form >
                <div className="resetPwd-subdiv-cnt">
                    <span className="resetPwd-span1-cnt">Reset Password</span>
                    <div className="resetPwd-div1-cnt">
                        <input type="password" placeholder="Password" className="resetPwd-input1-cnt" maxLength="256" value={password} onChange={(e) => setPassword(e.target.value)}/>
                    </div>
                    <button className="resetPwd-button1-cnt" onClick={(e) => handleReset(e)}>Reset</button>
                    <span className="resetPwd-span2-cnt">{message}</span>
                </div>
                </form>
            </div>
        </>
    );
};

export default ResetPassword;