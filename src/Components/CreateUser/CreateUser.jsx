import { useState } from "react";
import { CreateUser_ } from "../../utils/Api";
import { useNavigate } from "react-router-dom";
import './CreateUser.scss';

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
            await CreateUser_("", formData);

        }catch(error){
            console.log(error);
        }

    };

    return (
        <>
            <div className="user-createUser-cnt">
                <div className="user-createUserSub-cnt" >
                    <span className="user-main-cnt">Create User</span>
                    <div className="user-maindiv-cnt">
                         <form className="user-form-cnt">
                            <div className="user-div1-cnt">
                                <label>Enter your name:</label>
                                <input type="text" className="user-input1-cnt " value={name} placeholder="name" onChange={(e) => setName(e.target.value)}/>    
                            </div>
                            <div className="user-div2-cnt">
                                <label>Enter your department:</label>   
                                <input type="text" className="user-input2-cnt" value={dept} onChange={(e) => setDept(e.target.value)} placeholder="department"/>    
                            </div>
                            <div className="user-div6-cnt">
                                <label>Enter your designation:</label>
                                    <input type="text" className="user-input3-cnt" value={designation} onChange={(e) => setDesignation(e.target.value)} placeholder="designation"/>    
                            </div>
                            <div className="user-div4-cnt">
                                <label >Upload your image:
                                </label>
                                <div className="user-div5-cnt">
                                    <label className="user-label-cnt">
                                        Choose Image
                                        <input type="file" className="sr-only" accept=".jpg, .jpeg, .png, .jfif" onChange={(e) => setImage(e.target.files[0])}/>    
                                    </label>
                                </div>
                            </div>
                            <button className="user-button-cnt" onClick={handleSubmit}>Submit</button> 
                         </form>  
                    </div>
                </div>
            </div>
        </>
    )
}

export default CreateUser;