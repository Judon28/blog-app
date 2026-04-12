import Dsidebar from "../components/dsidebar";
import TrafficChart from "../components/trafficChart";
import {  useEffect, useState } from "react";
import { getPosts } from "../utilities/getPosts.js";
import PostPieChart from "../components/pieChart.jsx";
import DashboardHeader from "../components/dashboardHeader.jsx";





function DashHome () {
    const [posts, setPosts] = useState([]);



    useEffect( () => {
    
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
        
    }, [])
    

    /*const chartData = [
        { date: "Mar 23", views: 120 },
        { date: "Mar 24", views: 98 },
        { date: "Mar 25", views: 150 },
        { date: "Mar 26", views: 200 },
        { date: "Mar 27", views: 75 },
    ]*/

    // latest posts
    function sortPosts (a,b) {
        return new Date(b.date) - new Date(a.date);
    }

    const latestPosts = [...posts].sort(sortPosts)

    function trimTitle(text, length = 10) {
        if (!text) return "";

        if (text.length <= length) {
            return text;
        }

        return text.slice(0, length) + "...";
    }

    const chartData = (() => {
        const today = new Date();
        const daysMap = {};

        // Step 1: create last 7 days with 0 views
        for (let i = 6; i >= 0; i--) {
            const d = new Date();
            d.setDate(today.getDate() - i);

            const key = d.toISOString().split("T")[0]; // YYYY-MM-DD

            daysMap[key] = {
            date: d.toLocaleDateString("en-US", {
                month: "short",
                day: "numeric"
            }),
            views: 0
            };
        }

        // Step 2: add up views for each day
        posts.forEach(post => {
            const postDate = new Date(post.date);
            const key = postDate.toISOString().split("T")[0];

            if (daysMap[key]) {
            daysMap[key].views += post.views || 0;
            }
        });

        // Step 3: return as array (in order)
        return Object.values(daysMap);
    })();



    return(
        <>
            <div className="flex">
                <Dsidebar/>
                
                <div className="w-full">

                    <DashboardHeader title="Welcome Admin"/>

                    <div className="p-10 w-full ">
                        <div className="flex gap-5 font-inter">
                            <div className="w-50 flex gap-3 items-center bg-white rounded-xl p-3 shadow-[0_4px_20px_rgba(0,0,0,0.1)] ">
                                <i className="fas fa-file-alt text-[25px]"></i>
                                <div className="">
                                    <span className="text-[16px]">Total Posts</span>
                                    <p className="font-semibold">245</p>
                                </div>
                            </div>

                            <div className="w-50 flex gap-3 items-center bg-white rounded-xl p-3 shadow-[0_4px_20px_rgba(0,0,0,0.1)">
                                <i className="fas fa-check-circle text-[25px] "></i>
                                <div>
                                    <span className="text-[16px]">Published</span>
                                    <p className="font-semibold">120</p>
                                </div>
                            </div>

                            <div className="w-50 flex gap-3 items-center bg-white rounded-xl p-3 shadow-[0_4px_20px_rgba(0,0,0,0.1)">
                                <i className="fas fa-pencil-alt text-[25px]"></i>
                                <div>
                                    <span className="text-[16px]">Draft</span>
                                    <p className="font-semibold">20</p>
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-5 ">
                            <div className="dblock">
                                <div className="px-5 py-5 border-b border-gray-400">
                                        <h3 className="font-semibold text-[18px]">Recent Posts</h3>   
                                </div>

                                <div className="p-5">
                                    <table className="">
                                        <thead>
                                            <tr className="text-[16px] font-inter">
                                                
                                                <th className="tborder">Title</th>
                                                <th className="tborder">Status</th>
                                                <th className="tborder">Views</th>
                                                <th className="tborder">Date</th>
                                                
                                            </tr>
                                        </thead>

                                        
                                        <tbody>
                                            {latestPosts.slice(0,4).map((post) => (<tr key={post.id} className="">
                                                <td className="tborder" >{trimTitle(post.title)}</td>
                                                <td className="tborder">
                                                    <button className={`text-[15px] w-22 h-9 text-white rounded-3xl capitalize ${post.status==="published" ? "bg-green-500" :"bg-blue-500"}`}>{post.status}</button>
                                                </td>
                                                <td className="tborder text-center">{post.views}</td>
                                                <td className="tborder text-[12px] ">{post.date}</td>                
                                            </tr>))}
                                        </tbody>
                                        
                                    </table>
                                </div>
                            </div>

                            <div className="dblock2 w-[50%]">
                                <div className="flex gap-20 justify-between items-center px-5 py-5 border-b border-gray-400">
                                        <h3 className="font-semibold text-[20px]">Traffic Overview</h3>

                                        <div className="flex gap-2">
                                            
                                            <div className="w-5 h-5 rounded-full bg-[#facc15]"></div>
                                            <span className="text-[16px]">Post Views</span>

                                        </div>   
                                </div>

                                <div className="pr-5 py-5">
                                    <TrafficChart data={chartData}/>
                                </div>

                            </div>
                        </div>

                        <div>
                            <div className="dblock">
                                <div className="flex gap-20 justify-between items-center px-5 py-5 border-b border-gray-400">
                                        <h3 className="font-semibold text-[20px]">Category Distribution</h3>

                                        
                                </div>

                                <div>
                                    <PostPieChart posts={posts}/>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
        </>
    )
}

export default DashHome