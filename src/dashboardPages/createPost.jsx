import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Dsidebar from "../components/dsidebar";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import Editor from '../components/quillEditor/editor';
import postsData from "../postsData.js";
import TagInput from '../components/tagInput.jsx';
import { collection, addDoc, query, where, getDocs, updateDoc } from "firebase/firestore";
import { db } from "../firebaseConfig.js";
import { createSlug } from "../utilities/createSlug";
import {trimContents} from "../utilities/trimContents.js";
import { trimTitle, trimTableTitle } from "../utilities/trimTitle.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { plainContents } from '../utilities/plainContents.js';





export default function CreatePost () {

    const [editorContents, setEditorContents] = useState("")
    const [tags, setTags] = useState([]);
    //const storage = getStorage();
    const navigate = useNavigate();
    const [categories, setCategories] = useState([])

    //step1, image states
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);

    const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB
    const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/jpg"];

    const [imageError, setImageError] = useState("");
    const fileInputRef = useRef(null);

    const [isSubmitting, setIsSubmitting] = useState(false);
    const submitTimeoutRef = useRef(null);

    
    //fetch category
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

    //prevent menu navigation while publishing post
    useEffect(() => {
        const handleBeforeUnload = (e) => {
            if (isSubmitting) {
                e.preventDefault();
                e.returnValue = ""; // required for browser warning
            }
        };

        window.addEventListener("beforeunload", handleBeforeUnload);

        return () => {
            window.removeEventListener("beforeunload", handleBeforeUnload);
        };
    }, [isSubmitting]);

    function renderCategory (data) {
        return (
            <option key={data.id} value={data.category} className="capitalize">{data.category}</option>
        )
    }

    const categoryList = categories.map(renderCategory);


    //step2, file change handler
    function handleImageChange(e) {

        const file = e.target.files[0];

        if (!file) {
            setImageFile(null);
            setImagePreview(null);
            return;
        }

        // ✅ Check file type
        if (!ALLOWED_TYPES.includes(file.type)) {
            alert("Only image files (JPG, PNG, WEBP) are allowed.");
            e.target.value = ""; // reset input
            return;
        }

        // ✅ Check file size (2MB max)
        if (file.size > MAX_FILE_SIZE) {
            setImageError("Image must be less than 2MB");
            alert("Image must be less than 2MB.");
            e.target.value = "";
            return;
        }

        // ✅ If valid
        setImageFile(file);

        const previewURL = URL.createObjectURL(file);
        setImagePreview(previewURL);

        /*const file = e.target.files[0];
        if (file) {
            setImageFile(file);

            // create preview URL
            const previewURL = URL.createObjectURL(file);
            setImagePreview(previewURL);
        } else {
            setImageFile(null);
            setImagePreview(null);
        }*/

        
    }

    function handleRemoveImage() {
        setImageFile(null);
        setImagePreview(null);

        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    }

    //step3 update the ui
    


    async function handleCreatePost(formData) {
        //1 
        if (submitTimeoutRef.current) return;

        submitTimeoutRef.current = setTimeout(() => {
            submitTimeoutRef.current = null;
        }, 1000); // 1 second debounce

        if (isSubmitting) return;

        setIsSubmitting(true);

        /*if (isSubmitting) return;

        setIsSubmitting(true);*/


        try {

            const data = Object.fromEntries(formData);
            const content = trimContents(editorContents);
            const shortTitle = trimTitle(data.title);
            const shortTableTitle = trimTableTitle(data.title)
            const publishDate = new Date();
            const formattedDate = publishDate.toLocaleDateString("en-US", {
                                    month: "short",
                                    day: "numeric",
                                    year: "numeric",
            });

            //
            if (!content || content === "<p><br></p>") {
                alert("Content is required");
                return;
            }

            //step4 image
            let imageURL = "";

            

            if (imageFile) {
                if (!ALLOWED_TYPES.includes(imageFile.type)) {
                    alert("Invalid image format.");
                    setIsSubmitting(false);
                    return;
                }

                if (imageFile.size > MAX_FILE_SIZE) {
                    alert("Image too large.");
                    setIsSubmitting(false);
                    return;
                }

                
                    const storage = getStorage();
                    const imageRef = ref(storage, `postImages/${Date.now()}-${imageFile.name}`);
                    await uploadBytes(imageRef, imageFile);
                    imageURL = await getDownloadURL(imageRef);
            
            }
                        

            
            
            const postId = Date.now()

            let slug = createSlug(data.title, postId);

            const slugQuery = query(
                collection(db, "posts"),
                where("slug", "==", slug)
            );

            const snapshot = await getDocs(slugQuery);

            if (!snapshot.empty) {
                slug = `${slug}-${Date.now()}`;
            }
            

            const newPost = {
                id: postId,
                img: imageURL, //step5
                title: data.title,
                shortTitle: shortTitle,
                tableTitle: shortTableTitle,
                content: content,
                subtitle: data.subtitle,
                fullContent: editorContents,
                excerpt: data.excerpt,
                slug: slug,
                author: data.author,
                blogTitle: data.blogTitle,
                metaKeywords: data.metaKeywords,
                metaDescription: data.metaDescription,
                status: data.status,
                visibility: data.visibility,
                date: formattedDate,
                category: data.category,
                tags: tags,
                views: 0,
                sortDate: publishDate

            }

        

            const docRef = await addDoc(collection(db, "posts"), newPost);
            console.log("Post created successfully");

            
            setEditorContents("");
            setTags([]);
            setImageFile(null);
            setImagePreview(null);
            navigate("/dhome")


        } catch (error) {

            console.error("Error creating post:", error);

        } finally {
            // ✅ Always re-enable button
            setIsSubmitting(false);
        }


    }
    

    return (
        <>
            <div className="flex">

                <Dsidebar/>


                <form action={handleCreatePost}>
                   
                    <div className="flex min-w-0">
                        
                        <div className="p-10 w-[65%] min-w-0">
                            

                                <div className="mt-5 bg-white p-5 font-lato border-b border-gray-400 rounded-t-xl shadow-[0_0_2px_gray]">
                                    <h1 className="font-semibold text-[18px]">Add Post Content</h1>
                                </div>

                                <div className="bg-white p-5 font-inter rounded-b-xl shadow-[0_0_2px_gray]">
                                    <div className="flex flex-col gap-y-3">
                                        <label htmlFor="title">Title</label>
                                        <input id="title" name="title" type="text" placeholder="Title" className="p-5 border border-gray-300 rounded-xl h-10 outline-0" required/>
                                        <label htmlFor="subtitle">Subtitle</label>
                                        <input id="subtitle" name="subtitle" type="text" placeholder="Title" className="p-5 border border-gray-300 rounded-xl h-10 outline-0" required/>
                                        <Editor value={editorContents} onChange={setEditorContents}/>
                                    </div>
                                </div>

                                <div className="cpBox">
                                    <h1 className="font-semibold text-[18px]">Excerpt</h1>

                                    <div className="flex flex-col gap-y-3 mt-5">
                                        <label htmlFor="excerpt">Excerpt</label>
                                        <textarea id="excerpt" name="excerpt" className="p-5 border border-gray-300 rounded-xl h-40" required></textarea>
                                    </div>
                                </div>

                                

                                <div className="cpBox">
                                    <h1 className="font-semibold text-[18px]">Aurthor</h1>

                                    <div className="flex flex-col gap-y-3 mt-5">
                                        <label htmlFor="author">Aurthor</label>
                                        <input id="author" name="author" defaultValue="admin" type="text" className="p-5 border border-gray-300 rounded-xl h-10 outline-0" readOnly/>
                                    </div>
                                </div>

                                <div className="cpBox">
                                    <h1 className="font-semibold text-[18px]">SEO</h1>

                                    <div className="flex flex-col gap-y-3 mt-5">
                                        <label htmlFor="blogTitle">Blog Title</label>
                                        <input id="blogTitle" name="blogTitle" type="text" className="p-5 border border-gray-300 rounded-xl h-10 outline-0" required/>
                                    </div>

                                    <div className="flex flex-col gap-y-3 mt-5">
                                        <label htmlFor="metaKeywords">Meta Keywords</label>
                                        <input id="metaKeywords" name="metaKeywords" type="text" className="p-5 border border-gray-300 rounded-xl h-10 outline-0" required/>
                                    </div>

                                    <div className="flex flex-col gap-y-3 mt-5">
                                        <label htmlFor="metaDescription">Meta Description</label>
                                        <textarea id="metaDescription" name="metaDescription" className="p-5 border border-gray-300 rounded-xl h-40" required></textarea>
                                    </div>
                                </div>
                                
                            
                        </div>

                        <div className="p-10 w-[35%]">
                            <div className="cpBox">
                                <div className="flex justify-between">
                                    <h3>Publish</h3>
                                    
                                </div>
                                <div>
                                    <div className="flex flex-col gap-y-3 mt-2">
                                        <label htmlFor="status" className='text-gray-400 font-inter text-[13px]'>Status</label>
                                        <select defaultValue="published" id="status" name="status" className="p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-0 " required>     
                                            <option value="published">Published</option>
                                            <option value="draft">Draft</option>
                                            <option value="pending">Pending</option>
                                        </select>
                                    </div>
                                    
                                    <div className="flex flex-col gap-y-3 mt-2">
                                        <label htmlFor="visibility" className='text-gray-400 font-inter text-[13px]'>Visibility</label>
                                        <select defaultValue="public" id="visibility" name="visibility" className="p-3 border border-gray-300 rounded-xl outline-0">     
                                            <option value="public">Public</option>
                                        </select>
                                    </div>
                                    
                                    {/*<div className="flex flex-col gap-y-3 mt-2">
                                        <label htmlFor="publishDate" className='text-gray-400 font-inter text-[13px]'>Published on</label>
                                        <input type="date" className="p-5 border border-gray-300 rounded-xl h-10 outline-0"/>
                                    </div>*/}

                                    {/*<button type="submit" className='dbtn1 mt-5'>Publish</button>*/}
                                    
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className={`dbtn1 mt-5 flex items-center justify-center ${
                                            isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                                        }`}
                                    >
                                        {isSubmitting ? (
                                            <span className="flex items-center gap-2">
                                                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                                                Publishing...
                                            </span>
                                        ) : (
                                            "Publish"
                                        )}
                                    </button>

                                </div>
                            </div>

                            <div className="cpBox">
                                <div className="flex flex-col gap-y-3 mt-2">
                                    <div className="flex justify-between">
                                        <h3>Categories</h3>
                                        
                                    </div>
                                    {/*<label htmlFor="category" className='text-gray-400 font-inter text-[13px]'>Category</label>*/}
                                    <select id="category" name="category" className=" p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-0 text-[14px] " required>     
                                        <option value="">---Select a category---</option>
                                        {categoryList}
                                        
                                    </select>
                                </div>
                            </div>

                            {/*<div className="cpBox">
                                <div className="flex justify-between">
                                    <h3>Categories</h3>
                                    <div>close</div>
                                </div>

                                <div className="flex flex-col gap-y-3 mt-3">
                                    <fieldset>
                                        <label className='flex gap-1'>
                                            <input type="radio" name="category" value="Fashion" />
                                            Fashion
                                        </label>

                                        <label className='flex gap-1'>
                                            <input type="radio" name="category" value="Food" />
                                            Food
                                        </label>

                                        <label className='flex gap-1'>
                                            <input type="radio" name="category" value="Travel" />
                                            Travel
                                        </label>
                                    </fieldset>
                                </div>
                            </div>

                            <div className="cpBox">

                                <div>
                                    <input name="featuredImage" type="file"/>
                                </div>
                            </div>*/}

                            {/*Step 3 updated ui for image*/}
                            
                            <div className="cpBox">
                                <label className="font-inter text-[14px] mb-2">Featured Image</label>
                                
                                <div className="w-full h-48 border border-gray-300 rounded-xl flex items-center justify-center overflow-hidden cursor-pointer relative">
                                    {imagePreview ? (
                                    <img
                                        src={imagePreview}
                                        alt="Preview"
                                        className="w-full h-full object-cover"
                                    />
                                    ) : (
                                    <span className="text-gray-400">Click to select an image</span>
                                    )}

                                    {imageFile && (
                                        <button
                                            type="button"
                                            onClick={handleRemoveImage}
                                            className="absolute z-20 top-1 right-1 bg-black text-white px-3 py-1 rounded-md text-sm cursor-pointer"
                                        >
                                            <i class="fa-solid fa-trash"></i>
                                        </button>
                                    )}

                                    <input
                                    ref={fileInputRef}
                                    type="file"
                                    name="featuredImage"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="absolute z-10 inset-0 w-full h-full opacity-0 cursor-pointer"
                                    required
                                    />
                                </div>
                                    
                                
                            </div>


                            <div className="cpBox">
                                <TagInput tags={tags} setTags={setTags}/>
                                
                            </div>
                        </div>

                        
                        
                    </div>

                </form>
            
            </div>

            
        </>
    )
}