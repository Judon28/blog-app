import CategoriesTable from "../components/categoriesTable";
import Dsidebar from "../components/dsidebar";
import { useState, useEffect } from "react";
import { db } from "../firebaseConfig.js";
import { collection, addDoc, query, where, getDocs, updateDoc, doc, deleteDoc } from "firebase/firestore";
import DashboardHeader from "../components/dashboardHeader.jsx";




export default function Category () {

    const [categories, setCategories] = useState([]);
    


    useEffect (() => {
        async function fetchCategories () {
            try {
                const snapshot = await getDocs(collection(db, "categories"));
                const data = snapshot.docs.map(doc=>({
                    id: doc.id,
                    ...doc.data()
                }));

                setCategories(data);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        }

        fetchCategories()
    }, [])

    async function handleAddCategory (formdata) {
        const data = Object.fromEntries(formdata);

        const newCategory = {
            category: data.category.trim().toLowerCase(),
            date: new Date()
        }

        try {
            const docRef = await addDoc(collection(db, "categories"), newCategory);
            console.log("category added successfully")

            // refresh list
            setCategories(prev => [
                ...prev,
                { id: docRef.id,
                    ...newCategory
                }
            ])
            

        } catch (error) {
            console.error("Error adding category:", error);
        }

    }

    async function handleDeleteCategory (id) {
        try {
            await deleteDoc(doc(db, "categories", id));

            setCategories(prev => prev.filter(cat => cat.id !== id));
        } catch (error) {
            console.error("Error deleting cateory:", error);
        }
    }

    function categoryData (data) {
        return (
            <CategoriesTable
                key = {data.id}
                data = {data}
                onDelete = {handleDeleteCategory}
            />
        )
    }

    const table = categories.map(categoryData)

    return(
        <>
            <div className="flex">
                <Dsidebar/>

                <div className=" w-full">
                    <DashboardHeader title="Category"/>

                    <div className="p-10 w-full">
                        {/*<h1 className="font-lato font-semibold text-[30px]">Category</h1>*/}

                        <div className="flex gap-10 ">
                            <div className="dblock w-[45%] ">
                                <div className="px-5 py-5 border-b border-gray-400">
                                        <h3 className="font-semibold text-[18px]">Recent Posts</h3>   
                                </div>

                                <div className="px-5 pt-5 pb-10 ">
                                    <table className=" w-full">
                                        <tbody>
                                            {table}
                                        </tbody>

                                        

                                        
                                        
                                    </table>
                                </div>
                            </div>

                            <div className="cpBox w-[45%] h-fit ">
                                <h1 className="font-semibold text-[18px]">Add Category</h1>

                                <div className="flex flex-col gap-y-3 mt-5">

                                    <form action={handleAddCategory}>
                                        <input id="category" name="category" placeholder="Category name" className="w-full p-5 border border-gray-300 rounded-xl focus:outline-none focus:ring-0 " required></input>
                                        <button type="submit" className='dbtn3 mt-5 w-full'>Add</button>
                                    </form>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}