import dp from "../assets/img2.png";
import { useEffect, useState } from "react";
import { getPosts } from "../utilities/getPosts.js";
import { Link } from "react-router-dom";


export default function DashboardHeader (props) {

    const [posts, setPosts] = useState([]);
    
    const totalViews = posts.reduce((total, post) => {
        return total + (post.views || 0);
    }, 0);

    useEffect( () => {
    
        async function fetchPosts() {
        
                try{
                    const data = await getPosts();
        
                    setPosts(data);
                }catch (error) {
                    console.error("Error fetching posts:", error)
                }
        
                
        
            }
        
                fetchPosts();
        
    }, [])

    return (
        <>
            <div className="flex border justify-between items-center bg-black text-white h-20 px-10">
                <div>
                    <h1 className="font-lato font-semibold text-[30px]">{props.title}</h1>
                </div>

                <div className="flex gap-5 items-center">
                    

                    <div className="relative w-fit">
                        <i className="fa-solid fa-eye text-[30px] text-white"></i>

                        <span className="absolute -top-2 -right-2 bg-black text-white text-[10px] px-1.5 py-0.5 rounded-full font-semibold leading-none">
                            {totalViews}
                        </span>
                    </div>

                    <div>
                        <Link to="/profile">
                            <img src={dp} className="w-10 h-10 rounded-full"/>
                        </Link>
                        
                    </div>
                </div>
            </div>
        </>
    )
}