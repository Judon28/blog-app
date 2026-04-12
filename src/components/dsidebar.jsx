import logo from "../assets/logo.svg";
import dp from "../assets/img2.png";
import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { NavLink } from "react-router-dom";

export default function Dsidebar () {

    function Logout () {
        signOut(auth);
    }


    return (
        <>
            

            <div className="py-10 w-[20%] min-h-screen bg-white rounded-2xl h-auto">
                <div className="  flex flex-col justify-between h-full">
                    <div>
                        <div className="flex justify-between">
                            <Link to="/dashHome" className="px-10">
                                <img src={logo}/>
                            </Link>

                            
                        </div>

                        <div className="mt-10 font-inter  text-[18px]">
                            <Link to="/" className=" " target="_blank">
                                <div className="flex gap-5 px-10 w-fit">
                                        <i className="fa-solid fa-arrow-up-right-from-square"></i>
                                        <h3>View Site</h3>
                                    
                                </div>
                            </Link>

                            <NavLink 
                                to="/dashHome"
                                className={({ isActive }) => `navLink ${isActive ? "bg-black text-white" : "hover:bg-gray-300"}`}
                            >
                                <div className="flex items-center gap-5 w-fit">
                                    <i className="fa-solid fa-house"></i>
                                    <h3>Home</h3>
                                </div>    
                            </NavLink>

                            <NavLink 
                                to="/dhome"
                                className={({ isActive }) => `navLink ${isActive ? "bg-black text-white" : "hover:bg-gray-300"}`}
                            >
                                <div className="flex items-center gap-5 w-fit">
                                    <i className="fa-solid fa-file-lines"></i>
                                    <h3>Posts</h3>
                                </div>    
                            </NavLink>

                            <NavLink 
                                to="/createCategory"
                                className={({ isActive }) => `navLink ${isActive ? "bg-black text-white" : "hover:bg-gray-300"}`}
                            >
                                <div className="flex items-center gap-5 w-fit">
                                    <i className="fa-solid fa-tags"></i>
                                    <h3>Categories</h3>
                                </div>    
                            </NavLink>

                            <NavLink 
                                to="/profile"
                                className={({ isActive }) => `navLink ${isActive ? "bg-black text-white" : "hover:bg-gray-300"}`}
                            >
                                <div className="flex items-center gap-5 w-fit">
                                    <i className="fas fa-cog"></i>
                                    <h3>Settings</h3>
                                </div>    
                            </NavLink>

                            <Link to="/login" onClick={Logout} className="">
                                <div className="flex gap-5 px-10 w-fit">
                                        <i className="fa-solid fa-arrow-right-from-bracket"></i>
                                        <h3>Logout</h3>
                                    
                                </div>
                            </Link>
                          
                        </div>

                    </div>

                    <div className="flex items-center px-10 mt-10">
                        <Link to="/profile">
                            <img src={dp} className="w-10 h-10 rounded-full"/>
                        </Link>
                        
            
                    </div>

                </div>

            </div>

            
        </>
    )
}