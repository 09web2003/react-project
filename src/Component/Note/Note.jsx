import React from "react";
import "./Note.css";
import img1 from "../../assets/Note.png";
import Footer from "../Footer/Footer";

function Note() {
  return (
    <>
      <div className="main-page">
        <img src={img1} alt="" className="main-img" />

        <h1>Pocket Notes</h1>
        
        <p>
          Send and receive messages without keeping your phone online. Use
          Pocket Notes on up to 4 linked devices and 1 mobile phone
        </p>
        
        <Footer />
      </div>
    </>
  );
}

export default Note;
