import { Link } from "react-router-dom";

export default function Signup () {
    return (
        <>
            <div className=" h-screen flex items-center">
                <div className="w-[50%] md:w-[30%] transition-all duration-500 mx-auto my-auto rounded-b-xl shadow-[0_4px_10px_rgba(128,128,128,0.3)]">
                    <div className="bg-black uppercase text-white font-inter font-semibold text-[23px] flex h-12 justify-center items-center rounded-t-xl">
                        <h1>Admin Dashboard</h1>
                    </div>
                    <h2 className="font-lato font-semibold text-[25px] text-center pt-2">Sign Up</h2>
                    <p className="font-lato text-center">Create a new account to manage blog</p>
                    <form className="px-5 mt-5">
                        <div className="border border-gray-400 pl-3 h-9 flex items-center rounded">
                            <i className="fa-regular fa-user text-xl pr-2"></i>
                            <input id="username" name="username" type="text" placeholder="Username" className="w-full h-full border-none outline-none pr-14"/>
                        </div>

                        <div className="border border-gray-400 mt-5 pl-3 h-9 flex items-center rounded">
                            <i className="fa-regular fa-envelope text-xl pr-2"></i>
                            <input id="password" name="password" type="email" placeholder="Email" className="w-full h-full border-none outlinr-none pr-14" />
                        </div>

                        <div className="border border-gray-400 mt-5 pl-3 pr-3 h-9 flex items-center rounded">
                            <i className="fa-solid fa-lock text-xl pr-2"></i>
                            <input id="password" name="password" type="password" placeholder="Password" className="w-full h-full border-none outline-none pr-3" />
                            <i className="fa-solid fa-eye text-xl pr-2 ml-auto"></i>
                        </div>

                        <div className="border border-gray-400 mt-5 pl-3 pr-2 h-9 flex items-center rounded">
                            <i class="fa-solid fa-lock text-xl pr-2"></i>
                            <input id="confirm password" name="confirm password" type="password" placeholder="Confirm Password" className="w-full h-full border-none outline-none pr-3"/>
                            <i className="fa-solid fa-eye text-xl pr-2 ml-auto"></i>
                        </div>

                        <button className="mt-5 h-9 flex items-center justify-center bg-black text-white w-full rounded cursor-pointer">Sign Up</button>

                        <p className=" mt-3 mb-3 text-center">Already have an account? <strong><Link to="/login">Login</Link></strong></p>
                    </form>
                </div>
            </div>
        </>
    )
}