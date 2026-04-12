import logo from "../assets/elogo.png";
import { getPosts } from "../utilities/getPosts.js";
import { useEffect, useState } from "react";
import { getPublishedPosts } from "../utilities/getPublishedPosts.js";
import { Link } from "react-router-dom";
import { defaultImg } from "../utilities/defaultImg";
import { trimSideTitle } from "../utilities/trimTitle.js";
import Subscribe from "./subscribe.jsx";



export default function Sidebar () {

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

    function sortPosts (a,b) {
        return new Date(b.date) - new Date(a.date);
    }

    const latestPosts = [...publishedPosts].sort(sortPosts)

    



    return (
        <>
            <div className="lg:w-[35%] mt-10 lg:mt-0">
            

                
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
                    <h1 className="font-lato text-[20px] font-semibold">Featured Posts</h1>
                    {publishedPosts.slice(0,4).map((post) => (
                        <Link 
                            key={post.id}
                            to={`/post/${post.slug}`}
                            
                        >
                            <div className="mt-5 flex gap-5">
                                <div className="overflow-hidden rounded-xl">
                                    <img src={post.img || defaultImg(post.category)} alt="burger" className="w-40 h-20 rounded-xl transform transition-transform hover:scale-105 duration-300 cursor-pointer"/>
                                </div>
                                
                                <div className="grid gap-y-1 w-full">
                                    <h3 className="font-semibold font-inter">{trimSideTitle(post.title)}</h3>
                                    <span className="font-inter text-[14px]">{post.date}</span>
                                </div>
                            </div>
                        </Link>
                        
                        
                
                    ))}

                    
                </div>

            

                <div className="sideCard">
                    <h1 className="scTitle">Tags</h1>

                    <div className="mt-5 flex">
                        <button className="tagButton">Fashion</button>
                        <button className="tagButton">Food</button>
                        <button className="tagButton">People</button>
                        <button className="tagButton">Travel</button>
                    </div>

                    <div className="mt-2 flex">
                        <button className="tagButton">Lifestyle</button>
                        <button className="tagButton">Art</button>
                        <button className="tagButton">Culture</button>
                        <button className="tagButton">Beauty</button>
                    </div>

                </div>

                <div className="sideCard sticky top-10">
                    <h1 className="scTitle">Sign up for insights and ideas</h1>
                    <p className="font-inter mt-5">Subscribe for the latest news, stories, tips, and updates.</p>
                    <div className="relative mt-5 mx-auto">
                        <Subscribe/>

                        {/*<form className="flex justify-center">
                            <input type="email" name="email" placeholder="Your email address" className="bg-white h-17 rounded-full w-full pl-5 pr-[40%] py-5 text-[16px] outline-0" required/>
                            <input type="submit" value="subscribe" className="uppercase w-30 bg-black text-[16px] text-white rounded-full h-14 absolute right-2 top-1.5 cursor-pointer"/>
                        </form>*/}
                    </div>
                </div>

                

            

            </div>

        </>
    )
}