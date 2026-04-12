import logo from "../assets/logo.svg";
import { Link } from "react-router-dom";

export default function ContactSidebar () {
    return (
        <>
            <div className="lg:w-[35%] mt-10 lg:mt-0 ">
                <div className="bg-white p-10 rounded-xl">
                    <img src={logo}  />
                    <p className="mt-5 font-inter">Discover our stories celebrating travel, creativity, food, culture, and advice to spark deeper connections wherever your next journey takes you.</p>
                    <ul className="flex gap-3 mt-5 text-[26px]">
                        <Link>
                            <li><i className="fa-brands fa-instagram"></i></li>
                        </Link>
                        
                        <Link>
                            <li><i className="fa-brands fa-facebook"></i></li>
                        </Link>

                        <Link>
                            <li><i className="fa-brands fa-x-twitter"></i></li>
                        </Link>
                        
                        <Link>
                            <li><i className="fa-brands fa-youtube"></i></li>
                        </Link>
                    </ul>
                </div>


                <div className="sideCard">
                    <h1 className="scTitle">Sign up for insights and ideas</h1>
                    <p className="font-inter mt-5">Subscribe for the latest news, stories, tips, and updates.</p>
                    <div className="relative mt-5 mx-auto">
                        <form className="flex justify-center">
                            <input type="email" name="email" placeholder="Your email address" className="bg-white h-17 rounded-full w-full pl-5 pr-[40%] py-5 text-[16px] outline-0" required/>
                            <input type="submit" value="subscribe" className="uppercase w-30 bg-black text-[16px] text-white rounded-full h-14 absolute right-2 top-1.5 cursor-pointer"/>
                        </form>
                    </div>
                </div>

            </div>

</>
    )
}