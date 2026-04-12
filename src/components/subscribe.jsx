"use client";

import { useState } from "react";
import emailjs from "@emailjs/browser";

export default function Subscribe() {
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  // This function runs when form is submitted
  async function handleSubscribe(formData) {
    const email = formData.get("email");

    // Basic validation
    if (!email) {
      setStatus("Please enter a valid email");
      return;
    }

    try {
      setStatus("Subscribing...");

      // 1️⃣ Send email to USER
      await emailjs.send(
        "service_6egaac5",        // from EmailJS dashboard
        "template_1029g9x",      // template for user
        {
          email: email
        },
        "b-n9HZw7ZOplqUhVU"
      );

      // 2️⃣ Send email to YOU
      await emailjs.send(
        "service_6egaac5",
        "template_i8lw2db",     // template for admin
        {
          email: email
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
      <form action={handleSubscribe} className="form">   
            <input type="email" name="email" placeholder="Your email address" className="emailInput" required/>
            <input type="submit" value={loading ? "..." : "Subscribe"} className="submit"/>
            
      </form>
      <p className="text-sm mt-3 text-green-500">{status}</p>

    </>  
      

  );
}