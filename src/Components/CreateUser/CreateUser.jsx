import { useState } from "react";
import { CreateUser_ } from "../../Api";
import { useNavigate } from "react-router-dom";

const CreateUser = () =>{
    const [name, setName] = useState("");
    const [dept, setDept] = useState("");
    const [designation, setDesignation] = useState("");
    const [image, setImage] = useState("");
    const navigate = useNavigate();
    const handleSubmit = async() =>{
        try{
            const formData = new FormData();
            formData.append("name", name);
            formData.append("department", dept);
            formData.append("designation", designation);
            formData.append("image", image);
            const data = await CreateUser_("", formData);
            navigate("/home/table");

        }catch(error){
            console.log(error);
        }

    };

    return (
        <>
            <div className="bg-gray-300 flex h-screen justify-center  py-8 dark:bg-slate-900 dark:text-white">
                <div className="bg-white rounded-lg p-4 md:p-8 flex h-fit flex-col gap-4 md:gap-8 w-fit">
                    <span className="text-xl md:text-3xl md:font-serif dark:text-black">Create User</span>
                    <div className="w-60 md:w-fit rounded bg-orange-300 p-4">
                         <form className="flex flex-col gap-3 items-center md:gap-6">
                            <div className="flex flex-row text-xs w-full gap-2 md:gap-4 md:text-lg items-center justify-between">
                                <label >Enter your name:</label>
                                <input type="text" className="border border-1 border-black w-28 md:w-36 h-8 md:h-10  rounded px-2 " value={name} placeholder="name" onChange={(e) => setName(e.target.value)}/>    
                            </div>
                            <div className="flex flex-row gap-2 md:gap-4 w-full text-xs md:text-lg items-center ">
                                <label>Enter your department:</label>   
                                <input type="text" className="border border-1 border-black w-28 rounded px-2 md:w-36 h-8 md:h-10" value={dept} onChange={(e) => setDept(e.target.value)} placeholder="department"/>    
                            </div>
                            <div className="flex flex-row w-full gap-2 md:gap-4 text-xs md:text-lg items-center">
                                <label>Enter your designation:</label>
                                    <input type="text" className="border border-1 border-black px-2 w-28 md:w-36 h-8 md:h-10 rounded" value={designation} onChange={(e) => setDesignation(e.target.value)} placeholder="designation"/>    
                            </div>
                            <div className="flex flex-row w-full gap-2 text-xs md:text-lg md:gap-4  justify-between items-center">
                                <label >Upload your image:
                                </label>
                                <div className="w-28 md:w-36 ">
                                    <label className="border border-1 cursor-pointer hover:bg-gray-300 bg-blue-500 p-2 border-white rounded-md text-white text-xs">
                                        Choose Image
                                        <input type="file" className="sr-only" accept=".jpg, .jpeg, .png, .jfif" onChange={(e) => setImage(e.target.files[0])}/>    
                                    </label>
                                </div>
                            </div>
                            <button className="bg-blue-500 rounded-lg text-white px-3 py-2 hover:bg-gray-300" onClick={handleSubmit}>Submit</button> 
                         </form>  
                    </div>
                </div>
            </div>
        </>
    )
}

export default CreateUser;