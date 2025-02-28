import React from "react";
import "../styles/menuBar.css";

const Menubar = () => {
  return (
    <div>
        <span className="logo">📊</span> 
    <div className="menu-bar">
      <div className="menu-header">
      <div className="menu-title">
        <span className="title">Untitled spreadsheet</span>
      </div>
      <div className="menu-actions">
        <button className="share-btn">🔒 Share</button>
        <div className="user-icon">A</div>
      </div>
      </div>
      <div className="menu-options">
        <span>File</span>
        <span>Edit</span>
        <span>View</span>
        <span>Insert</span>
        <span>Format</span>
        <span>Data</span>
        <span>Tools</span>
        <span>Extensions</span>
        <span>Help</span>
      </div>
      
    </div>
    </div>

  );
};

export default Menubar;
