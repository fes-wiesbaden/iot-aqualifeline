import { Routes, Route, useNavigate } from "react-router-dom";
import "./css/HomeButton.css";
import "primeicons/primeicons.css";

function HomeButton() {
const navigate = useNavigate();
  return (
    <button className="home" onClick={() => navigate("/")}>
      <img src="/AquaLifeline/light-yellow-icon.png" alt="HOME" />
    </button>
  );
}

export default HomeButton;
