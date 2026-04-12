import logo from "../assets/logo.svg";
import dp from "../assets/img2.png";
import { Link } from "react-router-dom";
import PostsTable from "../components/postsTable.jsx";
import Dsidebar from "../components/dsidebar.jsx";
import { useRef, useEffect, useState } from "react";
import { getPosts } from "../utilities/getPosts.js";
import { doc, deleteDoc, } from "firebase/firestore";
import { db } from "../firebaseConfig";


export default function Dhome () {
    const [posts, setPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 7;
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    
    const [selectedPosts, setSelectedPosts] = useState([]);
    const [sortOption, setSortOption] = useState("newest");
    const [statusFilter, setStatusFilter] = useState("all");
    const [searchInput, setSearchInput] = useState("");
    const [searchQuery, setSearchQuery] = useState("");

    const allCount = posts.length;

    const publishedCount = posts.filter(
        post => post.status === "published"
    ).length;

    const draftCount = posts.filter(
        post => post.status === "draft"
    ).length;

    const totalViews = posts.reduce((total, post) => {
        return total + (post.views || 0);
    }, 0);



    


    useEffect( () => {

        async function fetchPosts() {
        
                try{
                    const data = await getPosts();
                    //console.log("Fetched posts:", data)

                    
        
                    setPosts(data);
                }catch (error) {
                    console.error("Error fetching posts:", error)
                }
        
              
        
            }
        
                fetchPosts();
        
    }, [])

    //reset after sorting
    useEffect(() => {

        setCurrentPage(1);

    }, [searchQuery]);


    //Search Posts
    function controlSearch (e) {
        return setSearchInput(e.target.value)
    } 

    function handleSearch () {
        setSearchQuery(searchInput)
    }

    function handleKeyDown (e) {
        if (e.key === "Enter") {
            e.preventDefault();
            
            handleSearch();
        }
    }


    //filter Posts
    function filterPosts(post) {
       
        const matchesStatus = statusFilter === "all" || post.status === statusFilter;

        const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase())
       
        return matchesStatus && matchesSearch
        
    }

    const filteredPosts= posts.filter(filterPosts);

    


    //control sort input
    function controlSort (e) {
        return setSortOption(e.target.value)
    }

    function createSortedPosts (a,b) {
            switch (sortOption) {
            case "newest":
                return new Date(b.date) - new Date(a.date);

            case "oldest":
                return new Date(a.date) - new Date(b.date);

            case "alpha_asc":
                return a.title.localeCompare(b.title);

            case "alpha_desc":
                return b.title.localeCompare(a.title);

            case "popular":
                return (b.views || 0) - (a.views || 0);

            default:
                return 0;
        }
    }

    const sortedPosts = [...filteredPosts].sort(createSortedPosts)
    const currentPosts = sortedPosts.slice(indexOfFirstPost, indexOfLastPost);

    //refresh post on delete
    async function refreshPosts() {
        const data = await getPosts();
        setPosts(data);
    }

    
    //toggle the check box
    function handleSelectPost(id) {
        setSelectedPosts(prev => {
            if (prev.includes(id)) {
                // remove if already selected
                return prev.filter(postId => postId !== id);
            } else {
                // add if not selected
                return [...prev, id];
            }
        });
    }


    // delete a single post via its button
    async function handleDeleteSingle(id) {
        try {
            await deleteDoc(doc(db, "posts", id));

            await refreshPosts();

            // remove from UI immediately
            setPosts(prev => prev.filter(post => post.id !== id));

            console.log("Post deleted");
        } catch (error) {
            console.error("Error deleting post:", error);
        }
    }

    //delete checked posts
    async function handleDeleteSelected() {
        try {
            const deletePromises = selectedPosts.map(id =>
                deleteDoc(doc(db, "posts", id))
            );

            await Promise.all(deletePromises);

            // update UI
            setPosts(prev => prev.filter(post => !selectedPosts.includes(post.id)));

            // clear selection
            setSelectedPosts([]);

            console.log("Selected posts deleted");
        } catch (error) {
            console.error("Error deleting selected posts:", error);
        }
    }

    //select all checkboxes
    function selectAll (e) {
        if (e.target.checked) {
            const currentPageIds = currentPosts.map(post => post.id);

            setSelectedPosts(prev => [
                ...new Set([...prev, ...currentPageIds])
            ]);
        } else {
            const currentPageIds = currentPosts.map(post => post.id);

            setSelectedPosts(prev =>
                prev.filter(id => !currentPageIds.includes(id))
            );
        }
    }

    /*function selectAll (e) {
        if (e.target.checked) {
            setSelectedPosts(posts.map(post => post.id));
        } else {
            setSelectedPosts([]);
        }
    }*/

    // check if all is selected
    const isAllCurrentSelected = currentPosts.every(post =>
        selectedPosts.includes(post.id)
    );


    function tableData (postData) {
        return (
            <PostsTable 
                key = {postData.id}
                postData = {postData}
                //title = {postData.title}
                onSelect={handleSelectPost}
                selectedPosts={selectedPosts}
                onDeleteSingle={handleDeleteSingle}
            />
        )
    }  
    
    //const table = postsData.map(tableData)
    const table = currentPosts.map(tableData)

    //calculate the total number of pages
    const totalPages = Math.ceil(posts.length / postsPerPage);

    //create page number buttons
    function renderPageNumbers() {
        let pages = [];

        for (let i = 1; i <= totalPages; i++) {
            pages.push(
                <button
                    key={i}
                    onClick={() => setCurrentPage(i)}
                    className={`navBtn cursor-pointer ${currentPage === i ? "bg-black text-white" : ""}`}
                >
                    {i}
                </button>
            );
        }

        return pages;
    }

    // return next and prev buttons
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

    return (
        <>
            <div className="flex">
                <Dsidebar />

                <div className="w-full">
                    <div className="flex border justify-between items-center bg-black text-white h-20 px-10">
                        <div>
                
                            <h1 className="font-lato font-semibold text-[30px]">Posts</h1>
                        </div>

                        <div className="flex gap-5 items-center">
                            <div>
                                <div className="relative w-[200px] text-black ">
                                    <input value={searchInput} onChange={controlSearch} onKeyDown={handleKeyDown} type="search" placeholder="Search..." className="h-10 bg-white shadow-[0_0_20px_gray] outline-0 rounded-lg py-5 pl-5 pr-10 w-full"/>
                                    <i onClick={handleSearch} className="fa-solid fa-magnifying-glass absolute right-3.5 top-1.5 translate-y-1.5 text-[16px] cursor-pointer"></i>
                                </div>
                            </div>

                            <div className="relative w-fit">
                                <i className="fa-solid fa-eye text-[30px] text-white"></i>

                                <span className="absolute -top-2 -right-2 bg-black text-white text-[10px] px-1.5 py-0.5 rounded-full font-semibold leading-none">
                                    {totalViews}
                                </span>
                            </div>

                            <div>
                                <img src={dp} className="w-10 h-10 rounded-full"/>
                            </div>
                        </div>
                    </div>
                

                    <div className="p-10">
                        
                        <div className="mt-5 bg-white rounded-xl p-5 font-inter">
                            <div className="flex gap-2 font-inter text-[16px]">
                                <label htmlFor="sort">Sort by:</label>
                                <select value={sortOption} onChange={controlSort} id="sort" name="sort" className="px-5 border border-gray-300 focus:outline-gray-300 focus:outline-1 text-gray-600 font-semibold">     
                                    <option value="newest">Newest</option>
                                    <option value="oldest">Oldest</option>
                                    <option value="alpha_asc">Title: A-Z</option>
                                    <option value="alpha_desc">Title: Z-A</option>
                                    <option value="popular">Most Popular</option>
                                </select>
                            </div>

                            <div className="mt-5">
                                <button
                                    onClick={() => setStatusFilter("all")}
                                    className={`w-50 h-8 border border-gray-300 cursor-pointer ${
                                        statusFilter === "all" ? "bg-black text-white" : ""
                                    }`}
                                >
                                    All ({allCount})
                                </button>
                                
                                <button
                                    onClick={() => setStatusFilter("published")}
                                    className={`w-50 h-8 border border-gray-300 cursor-pointer ${
                                        statusFilter === "published" ? "bg-black text-white" : ""
                                    }`}
                                >
                                    Published ({publishedCount})
                                </button>

                                <button
                                    onClick={() => setStatusFilter("draft")}
                                    className={`w-50 h-8 border border-gray-300 cursor-pointer ${
                                        statusFilter === "draft" ? "bg-black text-white" : ""
                                    }`}
                                >
                                    Draft ({draftCount})
                                </button>
                            </div>
                        </div>
                        

                        {/*<h1 className="font-lato font-semibold text-[30px]">Welcome Admin</h1>*/}

                        <div className="">
                            

                           

                            <div className="dblock">
                                <div className="flex justify-between px-10 py-5 border-b border-gray-400">
                                    <h3 className="font-semibold text-[20px]">Blogs</h3>

                                    <div className="flex gap-5">
                                        <button onClick={handleDeleteSelected} className="dbtn1">Clear</button>
                                        <Link to="/createPost">
                                            <button className="dbtn2">Add Post </button>
                                        </Link>
                                    </div>
                                    
                                </div>

                                {/*Posts Table*/}

                                
                                
                                
                                
                                <div className="p-10">

                                    <table className="w-full mx-auto">
                                        <thead>
                                            <tr className="text-[18px] font-inter">
                                                <th className="px-3 py-3 border-b border-gray-400"><input onChange={selectAll} checked={isAllCurrentSelected} type="checkbox" className="scale-150"/></th>
                                                <th className="tborder">Title</th>
                                                <th className="tborder">Status</th>
                                                <th className="tborder">Views</th>
                                                <th className="tborder">Published On</th>
                                                
                                                <th className="tborder">View Post</th>
                                                <th className="tborder">Action</th>
                                            </tr>
                                        </thead>
                                        
                                        <tbody>
                                            {table}
                                        </tbody>

                                       
                                    </table>

                                </div>

                                

                                <div className="p-10 flex justify-between items-center text-gray-500">
                                    <div>
                                    <p className="font-inter">Page {currentPage} of {totalPages}</p> 
                                    </div>

                                    <div className="flex gap-1">
                                        <button onClick={goToPrevPage} className="w-10 h-10 border border-gray-400 rounded-lg cursor-pointer"><i className="fa-solid fa-angle-left"></i></button>
                                        
                                        {renderPageNumbers()}
                                        <button onClick={goToNextPage} className="navBtn cursor-pointer"><i className="fa-solid fa-angle-right"></i></button>
                                    </div>
                                    
                                </div>

                                
                            </div>

                        </div>
                    </div>
                    
                </div>


            </div>
            
        </>
    )
}