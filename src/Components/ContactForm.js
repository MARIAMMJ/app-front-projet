import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Navbar from "./navbar";

const FORM_ENDPOINT = "https://herotofu.com/start"; 

const ContactForm = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Form response was not ok");
      }

      setSubmitted(true);
    } catch (error) {
      console.error("Error submitting form:", error);
      // You can handle error state here if needed
    }
  };

  if (submitted) {
    return (
      <div style={{ maxWidth: 400, margin: "auto" }}>
        <div className="text-2xl">Thank you!</div>
        <div className="text-md">We'll be in touch soon.</div>
      </div>
    );
  }

  return (
   
    <div>
       <Navbar/>
      <h2 style={{ textAlign: "center" , marginTop:"110px"}}>Contact Form</h2>
      <form
        style={{ display: "flex", flexDirection: "column", maxWidth: 400, margin: "auto" , marginTop:"50px"}}
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        <TextField
          style={{ marginBottom: 16 }}
          label="Your name"
          name="name"
          variant="outlined"
          required
        />
        <TextField
          style={{ marginBottom: 16 }}
          label="Email"
          name="email"
          type="email"
          variant="outlined"
          required
        />
        <TextField
          style={{ marginBottom: 16 }}
          label="Your message"
          name="message"
          multiline
          rows={4}
          variant="outlined"
          required
        />
        <Button
          style={{ marginTop: 16 }}
          className="active:bg-blue-600 hover:shadow-lg focus:outline-none px-6 py-3 mb-1 mr-1 text-sm font-bold text-white uppercase transition-all duration-150 ease-linear bg-blue-500 rounded shadow outline-none"
          type="submit"
          variant="contained"
        >
          Send a message
        </Button>
      </form>
    </div>
  );
};

export default ContactForm;
