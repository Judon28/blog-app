import Dsidebar from "../components/dsidebar";
import placeholderImage from "../assets/img2.png";
import { useRef, useState } from "react";

/*import { useState, useEffect } from "react";
import { auth, db } from "../firebaseConfig";

import {
  updateProfile,
  updateEmail,
  updatePassword
} from "firebase/auth";

import { doc, updateDoc, getDoc } from "firebase/firestore";

import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../firebaseConfig";*/


export default function Profile () {

    const [errorMsg, setErrorMsg] = useState("");
    
    const fileInputRef = useRef(null);
    const [dp, setDp] = useState(null);

    const handleChangeClick = () => {
        fileInputRef.current.click();
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setDp(imageUrl);
        }
    };

    function showError () {
        setErrorMsg("Save changes restricted for this user contact owner to grant access");
        return errorMsg;
    }

    /*const [userData, setUserData] = useState(null);
    const [imageFile, setImageFile] = useState(null);

    useEffect(() => {
    async function fetchUser() {
        const user = auth.currentUser;

        if (!user) return;

        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
        setUserData(docSnap.data());
        }
    }

    fetchUser();
    }, []);

    // handle image selection
    function handleImageChange(e) {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
        }
    }

    // handle form submission
    async function handleSaveChanges(formData) {
        
        const data = Object.fromEntries(formData)

        const user = auth.currentUser;

        if (!user) return;

        const fullName = e.target.fullName.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        const confirmPass = e.target.confirmPass.value;

        try {
            let photoURL = userData?.photoURL || "";

            // 🔥 1. Upload image if changed
            if (imageFile) {
            const imageRef = ref(storage, `profileImages/${user.uid}`);

            await uploadBytes(imageRef, imageFile);

            photoURL = await getDownloadURL(imageRef);
            }

            // 🔥 2. Update Auth profile (name + photo)
            await updateProfile(user, {
            displayName: fullName,
            photoURL: photoURL
            });

            // 🔥 3. Update Email (Auth)
            if (email !== user.email) {
            await updateEmail(user, email);
            }

            // 🔥 4. Update Password (Auth)
            if (password) {
            if (password !== confirmPass) {
                alert("Passwords do not match");
                return;
            }

            await updatePassword(user, password);
            }

            // 🔥 5. Update Firestore
            const userRef = doc(db, "users", user.uid);

            await updateDoc(userRef, {
            fullName,
            email,
            photoURL
            });

            alert("Profile updated successfully");

        } catch (error) {
            console.error(error);
            alert(error.message);
        }
    }*/

    return(

        <>
            <div className="flex ">
                <Dsidebar/>

                <div className="p-10 w-full">
                    <div className="flex gap-170">
                        <h1 className="font-lato font-semibold text-[30px]">Settings</h1>
                        <button onClick={showError} className="dbtn3 w-[150px]">Save Changes</button>
                    </div>
                    
                    <div className="text-center text-red-500">
                        <p>{errorMsg}</p>
                    </div>

                    <div className="flex gap-10">
                        <div className="cpBox w-[50%] ">
                            <h1 className="font-semibold text-[18px]">Profile Setting</h1>

                            <div className="mt-5 flex gap-5 ">
                                <div className="flex flex-col gap-y-3">
                                    {/* <img src={dp} className="w-40 h-40 rounded-full"/>
                                        <button className="w-40 border border-gray-300 rounded-md hover:bg-black hover:text-white cursor-pointer">Change</button>
                                    */}

                                    <img src={dp || placeholderImage} className="w-40 h-40 rounded-full "/>

                                    <button onClick={handleChangeClick} className="w-40 border border-gray-300 rounded-md hover:bg-black hover:text-white cursor-pointer">Change</button>

                                    {/* Hidden file input */}
                                    <input
                                        type="file"
                                        accept="image/*"
                                        ref={fileInputRef}
                                        onChange={handleImageChange}
                                        className="hidden"
                                    />

                                </div>

                                <div className="mt-5 flex flex-col gap-5">
                                    <input type="text" id="fullName" name="fullName" defaultValue="Sarah Doe" className="p-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-0 "/>
                                    <input type="email" id="email" name="email" defaultValue="sarah234@outlook.com" className="p-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-0 "/>
                                </div>
                                
                            </div>
                        </div>

                        <div className="w-[35%] ">
                            <div className="cpBox">
                                <h1 className="font-semibold text-[18px]">Role</h1>

                                <div className="mt-5">
                                    <input type="text" id="fullName" name="fullName" placeholder="Admin" className="w-full p-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-0 " readOnly/>
                                </div>
                            </div>

                            <div className="cpBox">
                                <h1 className="font-semibold text-[18px]">Security Setting</h1>

                                <div className="mt-5 flex gap-5">
                    
                                    <div className="w-full mt-5 flex flex-col gap-5">
                                        <input type="password" id="password" name="password" placeholder="New Password" className="w-full p-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-0 "/>
                                        <input type="password" id="confirmPass" name="confirmPass" placeholder="Confirm New Password" className="w-full p-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-0 "/>
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