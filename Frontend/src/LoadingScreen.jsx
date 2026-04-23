// src/LoadingScreen.jsx
import "./css/LoadingScreen.css";
import "primeicons/primeicons.css";

function LoadingScreen() {
  return (
    <div className="loading-screen">
      <i className="pi pi-spin pi-spinner-dotted" style={{ fontSize: "3rem", color: "var(--light-yellow)" }}></i>
    </div>
  );
}

export default LoadingScreen;