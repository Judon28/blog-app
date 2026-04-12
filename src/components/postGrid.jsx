import Sidebar from "./sidebar"
import postImg1 from "../assets/post-img1.png";
import PostCards from "./postCards";
import { getPosts } from "../utilities/getPosts.js";
import {  useEffect, useState } from "react";
import { getPublishedPosts } from "../utilities/getPublishedPosts.js";
import { Link } from "react-router-dom";




export default function PostGrid (props) {

    const [posts, setPosts] = useState([]);
    const publishedPosts = getPublishedPosts(posts)

    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 4;
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const  totalPages = Math.ceil(publishedPosts.length / postsPerPage)


    useEffect(() => {

        async function fetchPosts() {

            try{
                const data = await getPosts();
                console.log("Fetched posts:", data)

                setPosts(data);
            }catch (error) {
                console.error("Error fetching posts:", error)
            }

        

        }

            fetchPosts();

    }, []);

    

    function PostCardsData (data) {
        return (
            <Link 
                key={data.id}
                to={`/post/${data.slug}`}
            >
                <PostCards
                    data = {data}
                />

            </Link>
            
            
        )
    }

    function sortPosts (a,b) {
        return new Date(b.date) - new Date(a.date);
    }

    const latestPosts = [...publishedPosts].sort(sortPosts)

    function goToNextPage() {
        if (currentPage < totalPages) {
            setCurrentPage(prev => prev + 1);
        }
    }

    function goToPrevPage() {
        if (currentPage > 1) {
            setCurrentPage(prev => prev - 1);
        }
    }

    const postCards = latestPosts.slice(indexOfFirstPost, indexOfLastPost).map(PostCardsData)



    return (
        <>
            <section className="px-5 lg:px-10 py-10  lg:flex gap-10">
                <div className=" lg:w-[65%]">
                    <div className="grid lg:grid-cols-2 gap-10 gap-y-5">
                        {postCards}
                        
                    </div>

                    
                    
                    
                    <div className="mt-5 flex justify-between">
                        <button onClick={goToPrevPage} className={`h-10 w-10 bg-white rounded-full cursor-pointer ${currentPage === 1 ? " bg-gray-200 text-gray-400" : "shadow-[0_0_10px_black]"}`}><i className="fa-solid fa-long-arrow-left"></i></button>
                        <button onClick={goToNextPage} className={`h-10 w-10 bg-white rounded-full cursor-pointer ${currentPage === totalPages ? " bg-gray-200 text-gray-400" : "shadow-[0_0_10px_black]"}`}><i className="fa-solid fa-long-arrow-right"></i></button>
                    </div>
                </div>

                {/*Side Bar*/}

                <Sidebar />

                

            </section>
        </>
    )
}