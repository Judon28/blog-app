import { useState, useEffect, useRef } from "react";
import Editor from '../components/quillEditor/editor';
import TagInput from '../components/tagInput.jsx';
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc, updateDoc, getDocs, collection  } from "firebase/firestore";
import { db } from "../firebaseConfig";
//import {trimContents} from "../utilities/trimContents.js";
import { trimTitle, trimTableTitle } from "../utilities/trimTitle.js";
import { getPostById } from "../utilities/getPostBySlug.js";
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import Dsidebar from "../components/dsidebar.jsx";



export default function EditPost () {

    const [editorContents, setEditorContents] = useState("")
    const [tags, setTags] = useState([]);
    const [formData, setFormData] = useState({
        status: "",
        visibility: "",
        category: ""
    });

    const { id } = useParams();
    const navigate = useNavigate();

    const [post, setPost] = useState(null);

    const [categories, setCategories] = useState([]);

    //step 1, create image states
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);

    const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB
    const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/jpg"];

    const [imageError, setImageError] = useState("");
    const fileInputRef = useRef(null);

    /*const [isSubmitting, setIsSubmitting] = useState(false);
    const submitTimeoutRef = useRef(null);*/



    useEffect(() => {

        async function fetchPost() {

        try {

            const docRef = doc(db, "posts", id);
            const docSnap = await getDoc(docRef);
            //setPost(docSnap.data());
            

            if (docSnap.exists()) {    
                setPost(docSnap.data());
            } 
            
            

        } catch(error) {

            console.error("Error fetching post:", error);

        }

        }

        fetchPost();

    }, [id]);

    //avoid menu nav on submission
    /*useEffect(() => {
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
    }, [isSubmitting]);*/


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


    //step 2. load existing image
    useEffect(() => {
        if (post?.img) {
            setImagePreview(post.img); // existing image from Firebase
        }
    }, [post]);

    //step 3, extract file path from url
    function getImagePathFromURL(url) {
        try {
            const decoded = decodeURIComponent(url);
            const path = decoded.split("/o/")[1].split("?")[0];
            return path;
        } catch (error) {
            console.error("Error extracting image path:", error);
            return null;
        }
    }

    //step 4, handle image change
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

            const previewURL = URL.createObjectURL(file);
            setImagePreview(previewURL);
        }*/
    }

    function handleRemoveImage() {
        setImageFile(null);
        setImagePreview(null);

        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    }

    


    //show category options in select

    function renderCategory (data) {
        return (
            <option key={data.id} value={data.category} className="capitalize">{data.category}</option>
        )
    }

    const categoryList = categories.map(renderCategory);


    //on status change
    function handleStatusChange(e) {
        setFormData(prev => ({
            ...prev,
            status: e.target.value
        }));
    }

    //on visibility change
    function handleVisibilityChange(e) {
        setFormData(prev => ({
            ...prev,
            visibility: e.target.value
        }));
    }

    // on category change
    function handleCategoryChange(e) {
        setFormData(prev => ({
            ...prev,
            category: e.target.value
        }));
    }

    //for special inputs
    useEffect(() => {
        if (post) {
            setFormData({
                status: post.status || "",
                visibility: post.visibility || "",
                category: post.category || ""
            });
        }
    }, [post]);

    // for quill editor
    useEffect(() => {
        if (post) {
            setEditorContents(""); // reset
            setTimeout(() => {
                setEditorContents(post.fullContent || "");
            }, 0);
        }
    }, [post]);
    

    // for tags
    useEffect(() => {
        if(post){
            setTags(post.tags)
        }
    }, [post]);

    
    async function handleUpdatePost(formData){

        /*if (submitTimeoutRef.current) return;

        submitTimeoutRef.current = setTimeout(() => {
            submitTimeoutRef.current = null;
        }, 1000); // 1 second debounce

        if (isSubmitting) return;

        setIsSubmitting(true);*/

        

        

            const data = Object.fromEntries(formData);
            const shortTableTitle = trimTableTitle(data.title)
            const publishDate = new Date();
            const formattedDate = publishDate.toLocaleDateString("en-US", {
                                    month: "short",
                                    day: "numeric",
                                    year: "numeric",
            });


            //step6. handling image
            let imageURL = post?.img || "";

            if (imageFile) {
                try {
                    const storage = getStorage();

                    // 🔹 DELETE OLD IMAGE FIRST
                    if (post?.img) {
                        const oldPath = getImagePathFromURL(post.img);

                        if (oldPath) {
                            const oldImageRef = ref(storage, oldPath);

                            await deleteObject(oldImageRef)
                            .then(() => console.log("Old image deleted"))
                            .catch((err) => console.log("Old image not deleted:", err));
                        }
                    }

                    // 🔹 UPLOAD NEW IMAGE
                    if (!ALLOWED_TYPES.includes(imageFile.type)) {
                        alert("Invalid image format.");
                        //setIsSubmitting(false);
                        return;
                    }

                    if (imageFile.size > MAX_FILE_SIZE) {
                        alert("Image too large.");
                        //setIsSubmitting(false);
                        return;
                    }

                    
                    //const storage = getStorage();
                    const imageRef = ref(storage, `postImages/${Date.now()}-${imageFile.name}`);
                    await uploadBytes(imageRef, imageFile);
                    imageURL = await getDownloadURL(imageRef);

                    /*const imageRef = ref(
                    storage,
                    `postImages/${Date.now()}-${imageFile.name}`
                    );

                    await uploadBytes(imageRef, imageFile);

                    imageURL = await getDownloadURL(imageRef);*/

                } catch (error) {
                    console.error("Error handling image:", error);
                }
            }


            const updatedPost = {
                title: data.title,
                tableTitle: shortTableTitle,
                subtitle: data.subtitle,
                fullContent: editorContents,
                excerpt: data.excerpt,
                author: data.author,
                blogTitle: data.blogTitle,
                metaKeywords: data.metaKeywords,
                metaDescription: data.metaDescription,
                status: data.status,
                visibility: data.visibility,
                updatedDate: formattedDate,
                category: data.category,
                tags: tags,
                img: imageURL //step7 add image to object
            };

            
        try{

            const docRef = doc(db, "posts", id);

            await updateDoc(docRef, updatedPost);

            console.log("Post updated successfully");

            navigate("/dhome");

        } catch(error){

            console.error("Error updating post:", error);

        } /*finally {
            // ✅ Always re-enable button
            setIsSubmitting(false);
        }*/

    }

    
    /*if (!post){
        return null 
    }*/

    return (
        <>

            <div className="flex">
                <Dsidebar/>

                <form  onSubmit={(e) => {
                    e.preventDefault();
                    handleUpdatePost(new FormData(e.target));
                }}>
                    
                    <div className="flex">
                        
                        <div className="p-10 w-[65%]">
                            

                                <div className="mt-5 bg-white p-5 font-lato border-b border-gray-400 rounded-t-xl shadow-[0_0_2px_gray]">
                                    <h1 className="font-semibold text-[18px]">Add Post Content</h1>
                                </div>

                                <div className="bg-white p-5 font-inter rounded-b-xl shadow-[0_0_2px_gray]">
                                    <div className="flex flex-col gap-y-3">
                                        <label htmlFor="title">Title</label>
                                        <input id="title" name="title" type="text" defaultValue={post?.title} placeholder="Title" className="p-5 border border-gray-300 rounded-xl h-10 outline-0" />
                                        <label htmlFor="subtitle">Subtitle</label>
                                        <input id="subtitle" name="subtitle" type="text" defaultValue={post?.subtitle} placeholder="Title" className="p-5 border border-gray-300 rounded-xl h-10 outline-0" />
                                        <Editor key={post?.id} value={editorContents} onChange={setEditorContents}/>
                                    </div>
                                </div>

                                <div className="cpBox">
                                    <h1 className="font-semibold text-[18px]">Excerpt</h1>

                                    <div className="flex flex-col gap-y-3 mt-5">
                                        <label htmlFor="excerpt">Excerpt</label>
                                        <textarea id="excerpt" name="excerpt" defaultValue={post?.excerpt} className="p-5 border border-gray-300 rounded-xl h-40" required></textarea>
                                    </div>
                                </div>

                                {/*<div className="cpBox">
                                    <h1 className="font-semibold text-[18px]">Slug</h1>

                                    <div className="flex flex-col gap-y-3 mt-5">
                                        <label htmlFor="slug">Slug</label>
                                        <textarea id="slug" name="slug" className="p-5 border border-gray-300 rounded-xl h-40"></textarea>
                                    </div>
                                </div>*/}

                                <div className="cpBox">
                                    <h1 className="font-semibold text-[18px]">Author</h1>

                                    <div className="flex flex-col gap-y-3 mt-5">
                                        <label htmlFor="author">Author</label>
                                        <input id="author" name="author" type="text" defaultValue={post?.author} className="p-5 border border-gray-300 rounded-xl h-10 outline-0"/>
                                    </div>
                                </div>

                                <div className="cpBox">
                                    <h1 className="font-semibold text-[18px]">SEO</h1>

                                    <div className="flex flex-col gap-y-3 mt-5">
                                        <label htmlFor="blogTitle">Blog Title</label>
                                        <input id="blogTitle" name="blogTitle" type="text" defaultValue={post?.blogTitle} className="p-5 border border-gray-300 rounded-xl h-10 outline-0" required/>
                                    </div>

                                    <div className="flex flex-col gap-y-3 mt-5">
                                        <label htmlFor="metaKeywords">Meta Keywords</label>
                                        <input id="metaKeywords" name="metaKeywords" type="text" defaultValue={post?.metaKeywords} className="p-5 border border-gray-300 rounded-xl h-10 outline-0" required/>
                                    </div>

                                    <div className="flex flex-col gap-y-3 mt-5">
                                        <label htmlFor="metaDescription">Meta Description</label>
                                        <textarea id="metaDescription" name="metaDescription" defaultValue={post?.metaDescription} className="p-5 border border-gray-300 rounded-xl h-40" required></textarea>
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
                                        <select value={formData.status} onChange={handleStatusChange} id="status" name="status" className="p-3 border border-gray-300 rounded-xl focus:outline-white focus:ring-0 focus:border-none ">     
                                            <option value="published">Published</option>
                                            <option value="draft">Draft</option>
                                            <option value="pending">Pending</option>
                                        </select>
                                    </div>
                                    
                                    <div className="flex flex-col gap-y-3 mt-2">
                                        <label htmlFor="visibility" className='text-gray-400 font-inter text-[13px]'>Visibility</label>
                                        <select value={formData.visibility} onChange={handleVisibilityChange} id="visibility" name="visibility" className="p-3 border border-gray-300 rounded-xl outline-0">     
                                            <option value="public">Public</option>
                                        </select>
                                    </div>
                                    
                                    {/*<div className="flex flex-col gap-y-3 mt-2">
                                        <label htmlFor="publishDate" className='text-gray-400 font-inter text-[13px]'>Published on</label>
                                        <input type="date" className="p-5 border border-gray-300 rounded-xl h-10 outline-0"/>
                                    </div>*/}

                                    <button type="submit" className='dbtn1 mt-5'>Update</button>

                                    {/*<button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className={`dbtn1 mt-5 ${
                                            isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                                        }`}
                                    >
                                        {isSubmitting ? "Updating..." : "Update"}
                                    </button>*/}
                                    
                                </div>
                            </div>


                            <div className="cpBox">
                                <div className="flex flex-col gap-y-3 mt-2">
                                    <div className="flex justify-between">
                                        <h3>Categories</h3>
                                        <div>close</div>
                                    </div>
                                    {/*<label htmlFor="category" className='text-gray-400 font-inter text-[13px]'>Category</label>*/}
                                    <select value={formData.category} onChange={handleCategoryChange} id="category" name="category" className=" capitalize p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-0 " required>     
                                        
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
                                            <input type="radio" name="category" value="Fashion" checked={formData.category === "Fashion"} onChange={handleCategoryChange} />
                                            Fashion
                                        </label>

                                        <label className='flex gap-1'>
                                            <input type="radio" name="category" value="Food" checked={formData.category === "Food"} onChange={handleCategoryChange} />
                                            Food
                                        </label>

                                        <label className='flex gap-1'>
                                            <input type="radio" name="category" value="Travel" checked={formData.category === "Travel"} onChange={handleCategoryChange} />
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

                            {/*Step 5. update the UI */}
                            <div className="cpBox">
                                <label className="font-inter text-[14px] mb-2">Featured Image</label>

                                <div className="w-full h-48 border border-gray-300 rounded-xl flex items-center justify-center overflow-hidden relative cursor-pointer">
                                    
                                    {imagePreview ? (
                                    <img
                                        src={imagePreview}
                                        alt="Preview"
                                        className="w-full h-full object-cover"
                                    />
                                    ) : (
                                    <span className="text-gray-400">Click to upload image</span>
                                    )}

                                    {(imageFile || imagePreview) && (
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
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="absolute inset-0 opacity-0 cursor-pointer"
                                    />
                                </div>
                            </div>


                            <div className="cpBox">
                                <TagInput tags={tags} setTags={setTags} />
                        
                            </div>
                        </div>

                        
                        
                    </div>

                </form>

            </div>
        </>
    )
}