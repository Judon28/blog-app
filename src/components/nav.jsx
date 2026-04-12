import Logo from "../assets/elogo.png";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { getPosts } from "../utilities/getPosts.js";





function Nav () {

    const [posts, setPosts] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [debounced, setDebounced] = useState("");

    const [toggleNav, setToggleNav] = useState(false);

    const location = useLocation();

    
    //fetch the post
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

    //control debounce
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebounced(searchTerm)
        }, 400);

        return () => clearTimeout(timer);
    }, [searchTerm]);

    //clear input on location change
    useEffect(() => {
        setSearchTerm("");
        setDebounced("");
    }, [location.pathname]);

    // the search logic

    function searchPost (post) {
        if (!debounced) return true;

        const term = debounced.toLowerCase();

        return (
           (post.title || "").toLowerCase().includes(term) ||
            (post.subtitle || "").toLowerCase().includes(term)
        )
    }

    const searchedPosts = posts.filter(searchPost);


    function showMenu () {
        setToggleNav((prevNav) => {
            return !prevNav
            
        })

    }

    function navState () {
        if (!toggleNav) {
            return  <div className="pr-10 cursor-pointer">
                        <i onClick={showMenu} className="fas fa-bars"></i>
                    </div>
        }else {
            return  
                
        }
    }

    {/*code to prevent page from scrolling when mobile menu is on*/}
    useEffect(() => {
        if (toggleNav) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }

        return () => {
            document.body.style.overflow = "auto";
        };
    }, [toggleNav]);




    return(
        <>
            <nav className="hidden lg:block py-3  font-lato">
                <section className="px-10 pb-2 flex justify-end">
                    <ul className="flex justify-between w-30 items-center">
                        <Link>
                            <li><i className="fab fa-instagram"></i></li>
                        </Link>
                        
                        <Link>
                            <li><i className="fab fa-facebook"></i></li>
                        </Link>

                        <Link>
                            <li><i className="fab fa-twitter"></i></li>
                        </Link>
                        
                        <Link>
                            <li><i className="fab fa-tiktok"></i></li>
                        </Link>

                        <Link>
                            <li><i className="fab fa-pinterest"></i></li>
                        </Link>
                        
                        
                    </ul>
                </section>

                <section className="px-10 pt-3 border-gray-400 border-t text-[18px] uppercase">
                    <div className="flex justify-between items-center">
                        <div>
                           <Link to="/"> <img src={Logo} alt="Logo" /> </Link>
                        </div>

                        <div className="flex  w-[45%] justify-between items-center">
                            <ul className="flex w-[50%] justify-between">
                                <li><Link to="/" >Home</Link></li>
                                <li><Link to="/about">About</Link></li>
                                <li><Link to="/contact">Contact</Link></li>
                            </ul>

                           

                            <div className="w-[45%] relative">
                                

                                <div className=" relative w-full bg-white rounded-t-lg">
                                    <div className="relative ">
                                        <input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} type="search" placeholder="Search posts..." className="h-10  outline-0  py-5 pl-5 pr-10 w-full"/>
                                        <i className="fa-solid fa-magnifying-glass absolute right-3.5 top-1.5 translate-y-1.5 text-[16px]"></i>
                                    </div>

                                    

                                    {debounced && (
                                        <div className="w-full absolute bg-white border-t-gray-400 py-5 pl-3  max-h-100 rounded-b-lg overflow-y-auto shadow-[0_0_1px_gray]">
                                            <h3 className="font-inter text-[13px]">Posts</h3>

                                            {searchedPosts.length > 0 ? (
                                            searchedPosts.map((post) => (
                                                <Link 
                                                    key={post.id}
                                                    to={`/post/${post.slug}`}
                                                    
                                                >
                                                    <p className="capitalize text-[18px] font-semibold py-2">
                                                        {post.title.slice(0,20)}...
                                                    </p>
                                                        
                                                </Link>
                                                
                                            ))
                                            ) : (
                                            <p className="text-[15px] font-semibold py-2">
                                                No matches found
                                            </p>
                                            )}
                                        </div>
                                    )}

                                </div>
                            </div>

                            
                        </div>
                        
                    </div>
                </section>
            </nav>

            {/*Mobile Navigation*/}

            <nav className="lg:hidden flex items-center font-lato text-[18px] py-5 pl-10 justify-between relative">
                <div className=" w-27">
                    <Link to="/"> <img src={Logo} alt="Logo"/> </Link>
                </div>


                {!toggleNav && (
                    <div className="pr-10 cursor-pointer">
                        <i onClick={showMenu} className="fas fa-bars"></i>
                    </div>
                )}

                {toggleNav && (
                    <div
                    onClick={showMenu}
                    className="fixed inset-0 bg-black/40 z-40"
                    />
                )}

                <div className={`fixed h-screen top-0 right-0 z-50 rounded-bl-lg rounded-tl-lg w-[60%] py-5 px-5 bg-white transform transition-all duration-500 ease-in-out  ${ toggleNav ? "translate-x-0 opacity-100 pointer-events-auto" : "translate-x-full opacity-0 pointer-events-none"}`}>
                    <div className="flex justify-between">
                        <div className="relative w-[85%]">
                            

                            <div className="relative">
                                <input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} type="search" placeholder="Search..." className="h-10 shadow-[0_0_20px_gray] outline-0 rounded-t-lg py-5 pl-5 pr-10 w-full"/>
                                <i className="fa-solid fa-magnifying-glass absolute right-3.5 top-1.5 translate-y-1.5 text-[16px]"></i>
                            </div>

                            {debounced && (
                                <div className="w-full absolute bg-white border-t-gray-400 py-5 pl-3 h-30 max-h-30 rounded-b-lg overflow-y-auto shadow-[0_0_2px_gray]">
                                    <h3 className="font-inter text-[13px]">Posts</h3>

                                    {searchedPosts.length > 0 ? (
                                    searchedPosts.map((post) => (
                                        <Link 
                                            key={post.id}
                                            to={`/post/${post.slug}`}
                                            
                                        >
                                            <p className="capitalize text-[18px] font-semibold py-2">
                                                {post.title.slice(0,20)}...
                                            </p>
                                                
                                        </Link>
                                        
                                    ))
                                    ) : (
                                    <p className="text-[15px] font-semibold py-2">
                                        No matches found
                                    </p>
                                    )}
                                </div>
                            )}

                        </div>
                        <button onClick={showMenu} className="text-[24px] cursor-pointer"><i className="fas fa-times"></i></button>
                    </div>
                    
                    
                    <ul className="mt-7 grid gap-y-2">
                        <li><Link to="/" >Home</Link></li>
                        <li><Link to="/about">About</Link></li>
                        <li><Link to="/contact">Contact</Link></li>
                    </ul>

                    <div className="mt-10  w-fit mx-auto text-center">
                        <h1>Follow me on</h1>

                        <ul className="flex justify-between w-40 items-center mt-3">
                            <li><i className="fab fa-instagram"></i></li>
                            <li><i className="fab fa-facebook"></i></li>
                            <li><i className="fab fa-twitter"></i></li>
                            <li><i className="fab fa-tiktok"></i></li>
                        </ul>
                    </div>
                </div>

                
            </nav>
        </>
    )
}

export default Nav