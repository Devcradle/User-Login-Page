import { useNavigate } from 'react-router-dom';
import icon from './../../image.png';
import { useEffect, useState } from 'react';
import { GetAllUsers } from '../../Api';

const UserTable = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState([]);
    const handleData = async() =>{
        try{
            const data = await GetAllUsers("all");
            setUserData(data.data.data);
        }catch(error){
            console.log(error);
        }
    };
    useEffect(() => {
        handleData();
    }, [])

    return (
        <>      
            <div className='h-screen bg-gray-200 dark:bg-slate-800'>
                <div className='w-full flex flex-row py-2 md:px-6 justify-end px-2'>
                    <button className='p-1 md:px-4 md:py-2 bg-blue-400 border border-1 border-slate-700 hover:bg-neutral-300 rounded text-xs font-medium text-white' onClick={() => navigate("/home/create")}>Add User</button>
                </div>
                <div className='px-2 md:px-6'>
                    <table className="dark:bg-slate-500 bg-white dark:text-white w-full p-1 ">
                        <thead className=" text-xl bg-yellow-300">
                            <tr className='border border-2 border-slate-200 rounded-xl dark:border-white dark:border-white '>
                                <th className=" text-xs md:text-lg p-1 ">Image</th>
                                <th className=" text-xs md:text-lg p-1 ">Name</th>
                                <th className=" text-xs md:text-lg  p-1 ">Profession</th>
                                <th className=" text-xs md:text-lg  p-1 ">Department</th>
                                <th className=" text-xs md:text-lg  p-1 ">Action</th>
                            </tr>
                        </thead>
                        <tbody >
                            {userData.map((item) => (
                            <tr key={item.id} className='border-b border-2 border-slate-200 rounded-2xl dark:border-white'>
                                <td className="dark:border-white flex justify-center p-2 ">
                                    <img src={item.image.path} alt="image" className='h-10 w-10 md:h-16 md:w-16 border border-1 border-black rounded-lg hover:bg-blue-300'
                                    onError={(e) => {e.target.src = icon}}/>
                                </td>
                                <td className=" text-center p-1 text-xs md:text-lg dark:border-white w-fit h-fit text-wrap">{item.name}</td>
                                <td className=" text-center p-1 text-xs md:text-lg dark:border-white w-fit  h-fit text-wrap">{item.designation}</td>
                                <td className=" text-center p-1 text-xs md:text-lg dark:border-white w-fit h-fit text-wrap ">{item.department}</td>
                                <td className=" text-center p-1 text-xs md:text-lg dark:border-white w-fit h-fit text-blue-500 font-medium cursor-pointer underline " onClick={() => navigate("/home/edit", {state: item})}>edit</td>
                            </tr>))}
                        </tbody>
                    </table>
            </div>
            </div>
        </>
    );
};

export default UserTable;