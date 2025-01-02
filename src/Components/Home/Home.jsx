import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';
import icon from '../../image.png';
import Menu from '@mui/material/Menu';
import TableChartIcon from '@mui/icons-material/TableChart';
import { GetAdmin, GetAllUsers } from "../../utils/Api";
import { useDispatch } from "react-redux";
import { getUserlist } from "../../utils/Store/UserSlice";



const Home = () =>{
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [open, setOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const openProfile = Boolean(anchorEl);
    const name = localStorage.getItem("name");
    const handleData = async() =>{
        const data = await GetAllUsers("all");
        dispatch(getUserlist(data?.data?.data));
    }
    const handleClick = (action) =>{
        if(action === "home"){
            navigate('/home/welcome');
        }else if(action === "table"){
            navigate('/home/table');
        }
        setOpen(false);
    };
    const handleProfile = (event) => {
        setAnchorEl(event.currentTarget);
      };
      const handleClose = () => {
        setAnchorEl(null);
      };
    const handleToggle = () => {
        setIsDarkMode(!isDarkMode);
        if (isDarkMode) {
            document.documentElement.classList.remove('dark');
        } else {
            document.documentElement.classList.add('dark');
        }
    };

    const handleUser = async() => {
        try{
            const data = await GetAdmin("");
            navigate("/home/profile", {state: data.data.data})
            handleClose();
        }catch(error){
            console.log(error);
        }
    } 

    const handleLogout = () =>{
        localStorage.removeItem("ref");
        navigate("/login", {replace: true});
    };

    useEffect(() => {
        handleData();
    }, []); 

    return (
        <>
                <div className="bg-blue-400 flex justify-between items-center px-2 md:px-6 py-2 md:text-lg text-white p-2">
                    <button onClick={() => handleClick("home")}><HomeIcon className="text-white"/></button>
                    <button className="" onClick={() => handleClick("table")}><TableChartIcon/></button>
                    <span className="text-lg font-bold md:text-2xl">UserTable</span>
                    <img src={icon} alt="" className="w-6 h-6 md:w-8 md:h-8 rounded cursor-pointer" onClick={(e) => handleProfile(e)}/>
                    <Menu
                    anchorEl={anchorEl}
                    open={openProfile}
                    onClose={handleClose}
                    >
                    <div className="flex flex-col p-2 items-center gap-2 md:gap-3 md:p-4 md:min-w-32 min-w-20">
                        <span className="text-xs cursor-pointer hover:text-red-300 text-center md:text-lg" onClick={() => handleUser()}>Hii <br/>{name.split(" ")[0]}</span>
                        <button className="bg-rose-400 px-2 py-1 rounded-lg hover:bg-neutral-300 text-white text-xs md:text-lg" onClick={() => handleLogout()}>Logout</button>
                    </div>
                    </Menu>
                    <div className="border border-1 bg-white rounded-[50%] px-1.5 py-1  flex items-center md:px-2 md:py-1.5 cursor-pointer " onClick={handleToggle}>{isDarkMode?"🌞":"🌙"}</div>
                </div>

            <Outlet/>

        </>
    )
}

export default Home;