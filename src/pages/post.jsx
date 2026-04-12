import Sidebar from "../components/sidebar";
import Footer from "../components/footer";
import Nav from "../components/nav";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { defaultImg } from "../utilities/defaultImg.js";
import { getPostBySlug } from "../utilities/getPostBySlug.js";
import { sanitizeHtml } from "../utilities/sanitizeHtml.js";
import { doc, updateDoc, increment } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { formatContent } from "../utilities/formatContent.js";







export default function Post () {

    const {slug} = useParams();

    

    const [post, setPost] = useState(null);
    


    
    

    useEffect(() => {

        async function fetchPost() {

            try {

            const data = await getPostBySlug(slug);
            
            setPost(data);

            } catch (error) {

            console.error("Error fetching post:", error);

            }

        }

        fetchPost();

    }, [slug]);



    //calculating the views
    async function increaseViews(postId) {
        const docRef = doc(db, "posts", postId);

        await updateDoc(docRef, {
            views: increment(1)
        });
    }

    useEffect(() => {
        if (post?.id) {
            increaseViews(post.id);
        }
    }, [post]);

    

    if (!post) {
        //return <p>Loading post...</p>
        return null;
    }

    const image = post.img || defaultImg(post.category)
    //const safeContent = sanitizeHtml(post.fullContent);
    const safeContent = formatContent(sanitizeHtml(post.fullContent));


    const tags = post.tags ? post.tags.map((tag, index) => {
        return (
            <button
                key={index}
                className="font-semibold bg-white p-2 rounded-lg h-7 inline-flex whitespace-nowrap items-center"
            >
                {tag}
            </button>
        )
    }) : null;



    
    



    return (
        <>
            <Nav />
            <main className="px-5 lg:px-10 ">
                <article>

                
                    <figure className="gridCard h-80 md:h-110 lg:h-160 overflow-hidden transition-all duration-300 ease-in-out">
                        <img src={image} className="w-full h-full object-cover object-center rounded-xl"/>
                    </figure>

                    <div className="lg:flex gap-10 py-10">

                        <div className="flex gap-10 lg:w-[65%]">
                            <aside className="hidden bg-white w-[9%] h-fit py-3 lg:flex flex-col items-center rounded-xl shadow-[0_0_10px_gray]">
                                <h3 className="font-lato text-[18px]">Share</h3>
                                <ul className="mt-3 text-[26px]">
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
                            </aside>

                            <section className="w-full lg:w-[85%]">

                                <header className="border-b-[#DBDBDB] border-b pb-10">
                                    <div className="flex gap-3 pb-5">
                                        {/*<button className="tagButton shadow-[0_0_10px_gray]">style</button>
                                        <button className="tagButton shadow-[0_0_10px_gray]">style</button>*/}
                                        {tags}
                                    </div>

                                    <h2 className="font-lato text-[34px] md:text-[40px] lg:text-[48px] lg:leading-16 font-semibold transition-all duration-300 ease-in-out">{post.title}</h2>
                                    <p className="text-gray-500 text-[22px] font-inter font-semibold mt-5">{post.subtitle}</p>
                                    
                                    <section className="flex lg:justify-between items-center text-black lg:w-[40%] mt-3">
                                        <p className="capitalize w-fit">{post.author || "Jumiweb Team"}</p>
                                        <div className="mx-3 h-1 w-1 border-4 rounded-full"></div>
                                        <p className="capitalize">{post.date}</p>
                                    </section>  
                                    
                                    
                                </header>

                                <section className="mt-10">
                                    <section className="post-content">
                                        <div
                                            dangerouslySetInnerHTML={{__html: safeContent}}
                                        />

                                    </section>

                                    
                                    <div className="flex gap-5 items-center mt-10 justify-center bg-white h-20 rounded-xl">
                                        <h3 className="font-inter text-[18px]">Share</h3>
                                        <ul className="flex gap-3 text-[26px] ">
                                            <li><i className="fa-brands fa-instagram"></i></li>
                                            <li><i className="fa-brands fa-facebook"></i></li>
                                            <li><i className="fa-brands fa-x-twitter"></i></li>
                                            <li><i className="fa-brands fa-youtube"></i></li>
                                        </ul>
                                    </div>

                                </section>


                            </section>

                            
                        </div>

                        <Sidebar/>

                    </div>
 

                </article>
            </main>

            <Footer/>
        </>
    )
}