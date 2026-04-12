import logo from "../assets/elogo.png"
import { useEffect, useState } from "react";
import { getPublishedPosts } from "../utilities/getPublishedPosts.js";
import { Link } from "react-router-dom";
import { trimSideTitle } from "../utilities/trimTitle.js";
import { getPosts } from "../utilities/getPosts.js";
import Subscribe from "./subscribe.jsx";



function Footer () {

    const [posts, setPosts] = useState([]);
    const publishedPosts = getPublishedPosts(posts)

    useEffect(() => {

        async function fetchPosts() {

            try{
                const data = await getPosts();

                setPosts(data);
            }catch (error) {
                console.error("Error fetching posts:", error)
            }

        

        }

            fetchPosts();

    }, []);
    

    return (
        <>
            <div className="mt-5 lg:flex gap-10 p-10 border-t border-gray-400">
                <div className="grid gap-y-5 font-inter lg:w-[40%]">
                    <img src={logo} />
                    <p>Discover our stories celebrating travel, creativity, food, culture, and advice to spark deeper connections wherever your next journey takes you.</p>
                    <ul className="flex gap-3 mt-2 lg:mt-5 text-[26px]">
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

                <div className="mt-5 lg:mt-0 lg:w-[35%] ">
                    <h1 className="scTitle">Subscription</h1>

                    <div className="formContainer mt-5">
                        <Subscribe/>

                        
                    </div>
                    
                </div>

                <div className="mt-5 lg:mt-0 hidden lg:block lg:w-[25%] ">
                    <h1 className="scTitle">Popular posts</h1>
                    <ul className="font-inter grid gap-5 mt-5">
                        

                    {publishedPosts.slice(0,3).map((post) => (
                        <Link key={post.id} to={`/post/${post.slug}`}>
                            
                            <li className="hover:text-[#be9656b0]">{trimSideTitle(post.title)}</li>
                            
                        </Link>    
                
                    ))}


                    </ul>
                </div>

            </div>

            <div className="lg:flex justify-between font-inter text-[12px] lg:text-[14px] mt-5 px-10 py-3">
                
                <div className="lg:w-[30%] lg:hidden">
                    <ul className="flex lg:justify-end gap-5">
                        
                        <Link to="/">
                            <li className="hover:text-amber-500">Home</li>
                        </Link>

                        <Link to="/about">
                            <li className="hover:text-amber-500">About</li>
                        </Link>
                        
                        <Link to="/contact">
                            <li className="hover:text-amber-500">Contact</li>
                        </Link>

                    </ul>
                </div>
                
                <div className="py-2 lg:py-0">
                    <p>© Copyright Jumiweb - Theme by Jumiweb</p>
                </div>

                <div className="lg:w-[30%] hidden lg:block">
                    <ul className="flex lg:justify-end gap-5">
                        <Link to="/">
                            <li className="hover:text-amber-500">Home</li>
                        </Link>

                        <Link to="/about">
                            <li className="hover:text-amber-500">About</li>
                        </Link>
                        
                        <Link to="/contact">
                            <li className="hover:text-amber-500">Contact</li>
                        </Link>
                        
                    </ul>
                </div>
            </div>
        </>
    )
}

export default Footer