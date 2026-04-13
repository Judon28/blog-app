"use client";

import Nav from "../components/nav"
import PostGrid from "../components/postGrid"
import Footer from "../components/footer"
import ContactImg from "../assets/contact-img.jpg"
import ContactSidebar from "../components/contactSideBar"
import { useState } from "react";
import emailjs from "@emailjs/browser";

function Contact () {

    const [status, setStatus] = useState("");
    const [loading, setLoading] = useState(false);

    // This function runs when form is submitted
    async function handleSubscribe(formData) {
        //const email = formData.get("email");
        const data = Object.fromEntries(formData)

        // Basic validation
        if (!data.email) {
            setStatus("Please enter a valid email");
            return;
        }

        try {
            setStatus("Subscribing...");

            // 1️⃣ Send email to USER
           /* await emailjs.send(
            "service_6egaac5",        // from EmailJS dashboard
            "template_1029g9x",      // template for user
            {
                email: email
            },
            "b-n9HZw7ZOplqUhVU"
            );*/

            // 2️⃣ Send email to YOU
            await emailjs.send(
            "service_6egaac5",
            "template_i8lw2db",     // template for admin
            {
                email: data.email,
                name: data.name,
                message:data.message
            },
            "b-n9HZw7ZOplqUhVU"
            );

            setStatus("Subscribed successfully 🎉");

        } catch (error) {
            console.error(error);
            setStatus("Something went wrong ❌");
        }
    }



    return (
        <>
            <Nav />
            
            <div>
                
                <div className="bg-[url(./assets/contact-img.jpg)] bg-cover bg-center h-80 lg:h-110">
                    
                </div>

                <div className="lg:flex gap-10 p-5 lg:p-10">
                    <div className="lg:w-[65%]">
                        <form action={handleSubscribe} className="font-inter text-[18px] ">
                            <div className="flex flex-col">
                                <label htmlFor="name">Name *</label>
                                <input id="name" type="text" name="name" className="bg-white p-5 h-15 mt-2 outline-0" required />
                            </div>

                            <div className="flex flex-col mt-5">
                                <label htmlFor="email">Email * </label>
                                <input id="email" type="email" name="email" className="bg-white p-5 h-15 mt-2 outline-0"  required />
                            </div>

                            <div className="flex flex-col mt-5">
                                <label htmlFor="message">Message</label>
                                <textarea id="message" name="message" className="bg-white p-5  h-50 mt-2 outline-0"></textarea>
                            </div>

                            <input type="submit" className="bg-black text-white w-40 mt-5 h-12 "/>
                            
                        </form>
                    </div>

                    <ContactSidebar />
                </div>
            </div>

            <Footer />


        </>
    )
}

export default Contact