import { Routes, Route, useNavigate } from "react-router-dom";
import "./HomeButton.css";
import "primeicons/primeicons.css";

function HomeButton() {
const navigate = useNavigate();
  return (
    <button className="home" onClick={() => navigate("/")}>
      <i className="pi pi-home"></i>
    </button>
  );
}

export default HomeButton;
