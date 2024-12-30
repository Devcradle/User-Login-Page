import { useLocation, useNavigate } from "react-router-dom";
import icon from '../../image.png';
import { useEffect, useState } from "react";
import { EditUser_ } from '../../Api';

const EditUser= () =>{
    const [name, setName] = useState("");
    const [dept, setDept] = useState("");
    const [designation, setDesignation] = useState("");
    const location = useLocation();
    const data = location?.state;
    const id = data._id;
    const navigate = useNavigate();
    const handleData = () =>{
        setName(data.name);
        setDept(data.department);
        setDesignation(data.designation);
    };
    const handleSubmit = async(e) =>{
        try{
            e.preventDefault();
            const data = await EditUser_("", {name, department: dept, designation, id});
            navigate("/home/table");
        }catch(error){
            console.log(error);
        }
    };
    useEffect(() => {
        handleData();
    }, []);
    return (
        <>
            <div className="dark:bg-slate-900 flex flex-col h-screen py-8 bg-gray-100 items-center ">
                <form onSubmit={(e) => handleSubmit(e)}>
                <div className="bg-white rounded-lg py-6 px-10 md:px-16 flex flex-col gap-4">                    
                        <div className="text-center ">
                            <span className="text-3xl font-serif">Edit User</span>
                            <hr className="bg-gray-300 w-full "/>
                        </div>
                <div className="bg-white  flex flex-col md:flex-row gap-2 items-center md:items-start md:gap-10 h-full">
                        <div>
                            <img src={data.image.path} alt="image" onError={(e) => e.target.src = icon} className="w-24 h-24 md:w-32 md:h-32 rounded border border-1 border-gray rounded-[50%] p-1" />
                        </div>
                    <div className="flex flex-col items-center gap-4">
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col">
                            <label >Your Name</label>
                            <input type="text" className="p-2 border border-1 border-red-100 rounded" value={name} onChange={(e) => setName(e.target.value)}/>
                        </div>
                        <div className="flex flex-col">
                            <label >Your department</label>
                            <input type="text" className="p-2 border border-1 border-red-100 rounded" value={dept} onChange={(e) => setDept(e.target.value)}/>
                        </div>
                        <div className="flex flex-col">
                            <label >Your Profession</label>
                            <input type="text" className="p-2 border border-1 border-red-100 rounded" value={designation} onChange={(e) => setDesignation(e.target.value)}/>
                        </div>
                    </div>
                    <button className="bg-blue-500 text-white hover:bg-gray-400 w-fit px-4 py-1 rounded-lg">Save</button>
                    </div>
                </div>
                </div>
                </form>
            </div>
        </>
    )
};

export default EditUser;