import { Link } from "react-router-dom";
import Admins from "../adminLogin.js";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig.js";




export default function Login () {
    console.log(import.meta.env.VITE_FIREBASE_PROJECT_ID);
    const navigate = useNavigate();
    
    const [showPassword, setShowPassword] = useState(false);

    function togglePassword() {
        setShowPassword(prev => !prev);
    }

    async function submitLogin (formData) {
        //const data = Object.fromEntries(formData)
        //if you use the above commented, you will have to access data with data.email and data.password in the userCredential
        const email = formData.get("email");
        const password = formData.get("password");

        try {

            const userCredential = await signInWithEmailAndPassword(
            auth,
            email,
            password
            );

            const user = userCredential.user;

            console.log(user);

            navigate("/dashHome");

        } catch (error) {
            console.log(error.message);
            alert("Invalid login details");
        }


        /*console.log(data.username)

        function adminCheck (admin) {
            if (admin.username === data.username && admin.password === data.password) {
                //useNavigate("/dhome")
                window.location.href = "/dhome"
                return true
            }
            else{
                alert("incorrect username or password")
            }
        }

       Admins.find(adminCheck)*/
        
    }

    return (
        <>
            <div className=" h-screen flex items-center">
                <div className="w-[50%] md:w-[30%] transition-all duration-500 mx-auto my-auto rounded-b-xl shadow-[0_4px_10px_rgba(128,128,128,0.3)]">
                    <div className="bg-black uppercase text-white font-inter font-semibold text-[23px] flex h-12 justify-center items-center rounded-t-xl">
                        <h1>Admin Dashboard</h1>
                    </div>
                    <h2 className="font-lato font-semibold text-[25px] text-center pt-2">Login</h2>
                    <p className="font-lato text-center">Sign into your account to continue</p>
                    <form action={submitLogin} className="px-5 mt-5">

                        <div className="border border-gray-400 pl-3 h-9 flex items-center rounded">
                            <i className="fa-regular fa-user text-xl pr-2"></i>
                            <input id="email" name="email" type="email" placeholder="Email" className="w-full h-full border-none outline-none pr-14" required/>
                        </div>

                        {/*<div className="border border-gray-400 mt-5 pl-3 pr-3 h-9 flex items-center rounded">
                            <i className="fa-solid fa-lock text-xl pr-2"></i>
                            <input id="password" name="password" type="password" placeholder="Password" className="w-full h-full border-none outline-none pr-3" required />
                            <i className="fa-solid fa-eye text-xl pr-2 ml-auto"></i>
                        </div>*/}

                        <div className="border border-gray-400 mt-5 pl-3 pr-3 h-9 flex items-center rounded">
                            <i className="fa-solid fa-lock text-xl pr-2"></i>

                            <input
                                id="password"
                                name="password"
                                type={showPassword ? "text" : "password"}
                                placeholder="Password"
                                className="w-full h-full border-none outline-none pr-3"
                                required
                            />

                            <i
                                onClick={togglePassword}
                                className={`text-xl pr-2 ml-auto cursor-pointer ${
                                    showPassword ? "fa-solid fa-eye-slash" : "fa-solid fa-eye"
                                }`}
                            ></i>
                        </div>

                        <button className="mt-5 h-9 flex items-center justify-center bg-black text-white w-full rounded cursor-pointer">Login</button>

                        <p className=" mt-3 mb-3 text-center">Don't have an account? <strong><Link to="/signup">Sign Up</Link></strong></p>
                    </form>
                </div>
            </div>
        </>
    )
}