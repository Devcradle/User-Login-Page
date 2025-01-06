import {  useState } from 'react';
import icon from './../../image.png';
import { useLocation, useNavigate } from 'react-router-dom';
import { EditAdmin } from '../../utils/Api';
import './Profile.scss';



const Profile = () =>{
    const location = useLocation();
    let data = location.state;
    const [activeEmail, setActiveEmail] = useState(true);
    const [activeName, setActiveName] = useState(true);
    const [name, setName] = useState(data?.name);
    const [emailId, setEmailId] = useState(data?.emailId);
    let sname = null;
    let semail = null;
    const handleEdit = (action) =>{
        if(action === "emailId"){
            setActiveEmail(false);
        }else if(action === "name"){
            setActiveName(false);
        }
    };

    const handleCancel = (action) =>{
        if(action === "emailId"){
            setActiveEmail(true);
        }else if(action === "name"){
            setActiveName(true);
        }
    };
    const navigate = useNavigate();
    const handleSave = async(e) =>{
        e.preventDefault();
        try{
            await EditAdmin("", {name, emailId});
            localStorage.setItem("name", name);
            setActiveName(true);
            setActiveEmail(true);
            navigate("/home/welcome");
        }catch(error){
            console.log(error);
        }
    };


    return (
        <>
            <div className="profile-maindiv-cnt ">
                <form >
                <div className="profile-subdiv-cnt">
                    <div className='profile-div1-cnt'>
                        <div>
                            <span className="profile-span1-cnt">Profile</span>
                            <hr className='profile-hr1-cnt'/>
                        </div>
                        <img src={icon} alt="icon" className='profile-img1-cnt'onError={(e) =>e.target.src = icon}/>
                    </div>
                    <div className='profile-div2-cnt'>
                        {activeName?
                        <div className='profile-div3-cnt'>
                            <span className="profile-span2-cnt">Name: </span>
                            <span className='profile-spanName-cnt'>{sname?sname:data?.name}</span>
                            <span className='profile-span3-cnt' onClick={() => handleEdit("name")}>📝</span>
                        </div>
                        :
                        <div className='profile-div4-cnt'>
                            <input type="text" className='profile-input1-cnt' value={name} onChange={(e) => setName(e.target.value)}  />
                            <button className='profile-button1-cnt' onClick={() => handleCancel("name")}>Cancel</button>
                        </div>
                        }
                    </div>
                    <div className='profile-div5-cnt'>
                        {activeEmail?
                        <div className='profile-div6-cnt'>
                            <span className="profile-span4-cnt">EmailId:</span>
                            <span className='profile-span04-cnt'>{semail?semail:data?.emailId}</span>
                            <span className='profile-span5-cnt' onClick={() => handleEdit("emailId")}>📝</span>
                        </div>
                        :
                        <div className='profile-div7-cnt'>
                            <input type="text" className='profile-input2-cnt' value={emailId}  onChange={(e) => setEmailId(e.target.value)}/>
                            <button className='profile-button2-cnt' onClick={() => handleCancel("emailId")}>Cancel</button>
                        </div>
                        }
                    </div>
                    {!activeEmail || !activeName ? (
                        <div className="profile-div8-cnt">
                            <button className="profile-button2-cnt" onClick={(e) => handleSave(e)}>Save</button>
                        </div>
                    ) : (
                        <></>
                    )}
                </div>
                </form>
            </div>
        </>
    )
};

export default Profile;