import React from 'react';
import "../styles/Landing.css";
import LSPanel from "../components/LSPanel";
import Footer from "../components/Footer";

export default function Landing(){
    return (  
        <div className="Landing">
            <LSPanel/>
            <Footer/>
        </div>
    );
}
 
