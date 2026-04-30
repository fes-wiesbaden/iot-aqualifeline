import { Routes, Route, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import "./css/HomeButton.css";
import "primeicons/primeicons.css";

function HomeButton() {
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className={`homeWrapper ${isExpanded ? "expanded" : ""}`}>
      <button
        className="home"
        onClick={
          isExpanded
            ? () => {
                navigate("/");
              }
            : () => setIsExpanded(true)
        }
      >
        <img src="/iot-aqualifeline/light-yellow-icon.png" alt="HOME" />
      </button>
      <div className="subButtons">
        <button
          className="subHomeButton"
          onClick={() => {
            setIsExpanded(false);
            navigate("/login");
          }}
        >
          <i className="pi pi-user"></i> Login
        </button>
        <button
          className="subHomeButton"
          onClick={() => {
            setIsExpanded(false);
            navigate("/shop");
          }}
        >
          <i className="pi pi-shopping-bag"></i> Shop
        </button>
        <button
          className="subHomeButton close"
          onClick={() => {
            setIsExpanded(false);
          }}
        >
          <i className="pi pi-times"></i> Schließen
        </button>
      </div>
    </div>
  );
}

export default HomeButton;
