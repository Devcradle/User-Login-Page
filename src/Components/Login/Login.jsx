import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../utils/Api';
import './Login.scss';
import { useDispatch } from 'react-redux';
import { getAdminlist } from '../../utils/Store/AdminSlice';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [emailId, setEmailId] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleClick = async () => {
    try {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailId)) {
        setErrorMessage('EmailId not valid');
      } else if (password) {
        setErrorMessage('');
        const data = await login('login', { emailId, password });
        localStorage.setItem('ref', data?.data?.data?.token);
        navigate('/home/welcome');
        dispatch(getAdminlist(data?.data?.data));
      } else if (!password) {
        setErrorMessage('');
      }
    } catch (error) {
      error.response &&
      (error.response.data.code === 404 || error.response.data.code === 400)
        ? setErrorMessage(error.response.data.message)
        : setErrorMessage('');
    }
  };

  return (
    <>
      <div className="login-maindiv-cnt">
        <div className="login-subdiv-cnt">
          <span className="login-span0-cnt">Login Here!</span>
          <div className="login-div1-cnt">
            <input
              type="text"
              className="login-input1-cnt "
              maxLength="256"
              placeholder="EmailId"
              value={emailId}
              onChange={(e) => setEmailId(e.target.value)}
            />
            <div className="login-div2-cnt">
              <input
                type="password"
                className="login-input2-cnt"
                maxLength="256"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span
                className="login-span1-cnt"
                onClick={() => navigate('/forgetpwd')}
              >
                Forget Password
              </span>
            </div>
          </div>
          <div className="login-div3-cnt">
            <span className="login-span2-cnt">{errorMessage}</span>
            <button className="login-button1-cnt" onClick={handleClick}>
              Submit
            </button>
          </div>
          <div className="login-div4-cnt">
            <span className="login-span3-cnt">Don&apos;t have an account!</span>
            <span
              className=" login-span4-cnt"
              onClick={() => navigate('/', { replace: true })}
            >
              {' '}
              SignUp here
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
