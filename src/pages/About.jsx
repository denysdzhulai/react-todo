import React from "react";
import { Link } from "react-router-dom";
import "../index.css";

const About = () => {
  return (
    <div className="about-container">
      <nav>
      <Link to="/" className="about-btn">Home</Link>
      </nav>
      <h1>About Get-It-Done</h1>
      <p>
        Get-It-Done is a simple and efficient task management app designed to help 
        you stay organized and productive.
      </p>
      <p>
        Built with React, the app fetches and stores data using Airtable. 
        It also provides sorting options, local storage persistence, 
        and smooth user experience features.
      </p>
      <p>
        Created by <strong>Denys Dzhulai</strong> as part of the CTD React course (Ibis cohort).
      </p>
    </div>
  );
};

export default About;
