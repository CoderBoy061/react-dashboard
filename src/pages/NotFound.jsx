import React from "react";
import { useNavigate } from "react-router-dom";
import "./notfound.css";
import notfound from "../assets/image.png";
const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="nf-wrap">
      <div className="nf-card">
        <div className="nf-emoji">
          <img src={notfound} alt="notfound" />
        </div>
        <h1 className="nf-title">Page not found</h1>
        <p className="nf-desc">
          The page you’re looking for doesn’t exist or has been moved.
        </p>
        <div className="nf-actions">
          <button className="nf-btn " onClick={() => navigate("/")}>
            Go to Dashboard
          </button>
          <button className="nf-btn" onClick={() => navigate(-1)}>
            Go back
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
