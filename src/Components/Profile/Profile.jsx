import {  useState } from 'react';
import icon from './../../image.png';
import { useLocation, useNavigate } from 'react-router-dom';
import { EditAdmin } from '../../utils/Api';



const Profile = () =>{
    const location = useLocation();
    let data = location.state;
    const [activeEmail, setActiveEmail] = useState(true);
    const [activeName, setActiveName] = useState(true);
    const [name, setName] = useState(data.name);
    const [emailId, setEmailId] = useState(data.emailId);
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
            <div className="bg-gray-200 h-screen dark:bg-slate-800 flex justify-center">
                <form >
                <div className="bg-white w-fit rounded-lg px-4 py-6 md:py-10 mt-12 bg-orange-200 text-white flex flex-col gap-4 font-serif h-fit">
                    <div className='flex justify-between'>
                        <div>
                            <span className="text-2xl font-mono text-gray-300 ">Profile</span>
                            <hr className='flex-grow h-1 bg-white '/>
                        </div>
                        <img src={icon} alt="icon" className='rounded-[50%] w-20  h-20'onError={(e) =>e.target.src = icon}/>
                    </div>
                    <div className='flex flex-row justify-between border border-2 border-red-400 p-2 rounded-lg bg-orange-300'>
                        {activeName?
                        <div className='flex justify-between w-full items-center'>
                            <span className="text-sm md:text-lg">Name: {sname?sname:data.name}</span>
                            <span className='cursor-pointer' onClick={() => handleEdit("name")}>📝</span>
                        </div>
                        :
                        <div className='flex  gap-2 w-full justify-between'>
                            <input type="text" className='text-black p-2 rounded' value={name} onChange={(e) => setName(e.target.value)}  />
                            <button className='bg-blue-600 p-2 rounded-lg text-xs tracking-wide' onClick={() => handleCancel("name")}>Cancel</button>
                        </div>
                        }
                    </div>
                    <div className='flex border border-2 border-red-400 p-2 rounded-lg bg-orange-300'>
                        {activeEmail?
                        <div className='flex justify-between w-full gap-2 md:gap-4 items-center'>
                            <span className="text-xs text-wrap md:text-lg">EmailId: {semail?semail:data.emailId}</span>
                            <span className='cursor-pointer' onClick={() => handleEdit("emailId")}>📝</span>
                        </div>
                        :
                        <div className='flex justify-between gap-2'>
                            <input type="text" className='text-black p-2 rounded' value={emailId}  onChange={(e) => setEmailId(e.target.value)}/>
                            <button className='bg-blue-600 p-2 rounded-lg text-xs  tracking-wide' onClick={() => handleCancel("emailId")}>Cancel</button>
                        </div>
                        }
                    </div>
                    {!activeEmail || !activeName ? (
                        <div className="flex justify-center">
                            <button className="bg-blue-500 rounded-lg px-3 py-1 w-fit cursor-pointer hover:bg-neutral-300" onClick={(e) => handleSave(e)}>Save</button>
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