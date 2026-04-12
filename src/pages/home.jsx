import Nav from "../components/nav"
import postImg1 from "../assets/post-img1.png";
import logo from "../assets/logo.svg";
import navImg1 from "../assets/nav-img1.png";
import Footer from "../components/footer";
import { useRef, useEffect, useState } from "react";
import Slider from "../components/slider";
//import Data from "../data.js"
import HomeGrid from "../components/homegrid.jsx";
import PostCards from "../components/postCards.jsx";
//import postsData from "../postsData.js";
import { Link } from "react-router-dom";
//import { posts } from "../data.js";
import { getPublishedPosts } from "../utilities/getPublishedPosts.js";
import { getPosts } from "../utilities/getPosts.js";
import Sidebar from "../components/sidebar.jsx";
import Subscribe from "../components/subscribe.jsx";





function Home () {

    const [posts, setPosts] = useState([]);
    const publishedPosts = getPublishedPosts(posts)
    
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 4;
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;

    
    

    {/*to show the center of the slider div*/}
    const sliderRef = useRef(null);

    useEffect(() => {
        const slider = sliderRef.current;
        if (!slider) return;

        const cards = slider.children;
        if (!cards.length) return;

        const middleIndex = Math.floor(cards.length / 2);
        const middleCard = cards[middleIndex];

        middleCard.scrollIntoView({
            behavior: "auto", // change to smooth animation
            inline: "center",
            block: "nearest",
        });
    }, []);

    
    

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

    // latest posts
    function sortPosts (a,b) {
        return new Date(b.date) - new Date(a.date);
    }

    const latestPosts = [...publishedPosts].sort(sortPosts)



    function SliderData (data) {
        return(

            // for ref. the styles present in the link, i took it from the parent div in my slider 
            // component because the width, had to be the parent container, which is now link.
            <Link 
                key={data.id}
                to={`/post/${data.slug}`}
                className="shrink-0 w-[80%] lg:w-[65%]"
            >
                <Slider
                    data = {data}
                />
            </Link>
        )
    }

    
    const slider = latestPosts.map(SliderData)

    
    const  totalPages = Math.ceil(publishedPosts.length / postsPerPage)


    function HomeGridData (data) {
        return (

            <Link 
                key={data.id}
                to={`/post/${data.slug}`}
                className="lg:h-85 lg:text-[18px]"
            >
                <HomeGrid
                    key= {data.id}
                    data = {data}
                />
            </Link>

            
        )
    }

    
    const grid = latestPosts.slice(0,4).map(HomeGridData)
    

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


    //the pagination number
    function renderPageNumbers() {
        let pages = [];

        for (let i = 1; i <= totalPages; i++) {
            pages.push(
                <button
                    key={i}
                    onClick={() => setCurrentPage(i)}
                    className={`cursor-pointer ${currentPage === i ? "text-[#be9656b0]" : ""}`}

                >
                    {i}
                </button>
            );
        }

        return pages;
    }

    //next and prev
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
            <Nav />
            <div>
                <section className="px-15">
                    <div className="text-center py-13 font-inter  lg:w-[80%] mx-auto">
                        <h1 className="font-semibold text-[36px] lg:text-[75px] leading-[110%]">Exploring the world, one outfit and one dish at a time.</h1>
                        <h3 className="mt-5 text-[18px] lg:text-[22px] text-gray-500">A team obsessed with food and travel. We document the moments; the world tells the stories.</h3>
                    </div>
                    
                    <div className="relative text-center md:w-[50%] lg:w-[30%] mx-auto">
                        <Subscribe/>
                        {/*<form className="flex justify-center">
                            <input type="email" name="email" placeholder="Your email address" className="bg-white h-17 rounded-full w-full pl-5 py-5 pr-[40%] text-[16px] outline-0" required/>
                            <input type="submit" value="subscribe" className="uppercase w-30 bg-black text-[16px] text-white rounded-full h-14 absolute right-2 top-1.5 cursor-pointer"/>
                        </form>*/}
                    </div>
                </section>

                <section className="py-5">
                    
                    <div ref={sliderRef} className="flex gap-5 lg:gap-10 overflow-x-auto snap-x snap-mandatory px-10 scrollbar-hide">
                        
                        {slider}
                        
                        

                        

                    </div>

                    
                </section>

                <section className="px-5 lg:px-10 mt-5">
                    <div className="font-inter text-[26px] lg:text-[36px] font-semibold">
                        <h1>Explore By Tag</h1>
                    </div>

                    <div className="flex gap-3 lg:gap-10 mt-2">
                        <button className="tagButton">Fashion</button>
                        <button className="tagButton">Food</button>
                        <button className="tagButton">Travel</button>
                        <button className="tagButton">Lifestyle</button>
                    </div>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-10 mt-5">
                        
                    

                        {grid}

                        
                        
                    </div>
                </section>

                

                 
                <section className="px-5 lg:px-10 py-10  lg:flex gap-10">
                    <div className=" lg:w-[65%]">
                        <div className="grid lg:grid-cols-2 gap-10 gap-y-5">
                            {postCards}
                            
                        </div>

                        
                        
                        
                        <div className="h-15 mt-5 lg:mt-10 px-3 flex justify-between bg-white shadow-[0_10px_15px_rgba(0,0,0,0.2)] rounded-lg w-fit mx-auto">
                            <button onClick={goToPrevPage} className={`px-5 cursor-pointer  ${currentPage === 1 ? " text-gray-400" : ""}`}><i className={`fa-solid fa-long-arrow-left pr-2  ${currentPage === 1 ? " text-gray-400" : "text-gray-600 "}`}></i> Previous </button>
                            <div className="w-fit flex gap-5  ">
                                {renderPageNumbers()}
                            </div>
                            <button onClick={goToNextPage} className={`px-5 cursor-pointer ${currentPage === totalPages ? "text-gray-400" : ""}`}>Next<i className={`fa-solid fa-long-arrow-right pl-2 ${currentPage === totalPages ? "text-gray-400" : "text-gray-600 "}`}></i></button>
                        </div>
                    </div>

                    {/*Sidebar */}

                    <Sidebar/>

                </section>

                

                <Footer />
            </div>
        </>
    )
}

export default Home