import { useState } from 'react';
import { forgetPasswordAdmin } from '../../utils/Api';
import './ForgetPassword.scss';

const ForgetPassword = () => {
  const [emailId, setEmailId] = useState('');
  const [errorMessage, setErrorMessage] = useState(false);
  const [message, setMessage] = useState('');
  const handleSubmit = async () => {
    try {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailId)) {
        setErrorMessage('Invalid EmailId');
      } else {
        setErrorMessage('');
        setMessage('');
        const data = await forgetPasswordAdmin('forgetpassword', { emailId });
        setMessage(data?.data?.message);
      }
    } catch (error) {
      error.response && setErrorMessage(error.response.data.message);
    }
  };

  return (
    <>
      <div className="forgetPwd-mainDiv-cnt">
        <div className="forgetPwd-subMainDiv-cnt">
          <span className="forgetPwd-span1-cnt">Forget Password</span>
          <div className="forgetPwd-div1-cnt">
            <input
              type="text"
              placeholder="EmailId"
              value={emailId}
              className="forgetPwd-input1-cnt w-fit "
              maxLength="256"
              onChange={(e) => setEmailId(e.target.value)}
            />
            <span className="forgetPwd-span2-cnt">{errorMessage}</span>
            <button
              className="forgetPwd-button1-cnt"
              onClick={() => handleSubmit()}
            >
              Submit
            </button>
            <span className="forgetPwd-span3-cnt">{message}</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgetPassword;
