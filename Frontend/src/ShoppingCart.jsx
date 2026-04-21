import { Routes, Route, useNavigate } from "react-router-dom";
import "./css/ShoppingCart.css";
import "primeicons/primeicons.css";

function ShoppingCart() {
const navigate = useNavigate();
  return (
    <button className="shopping-cart" onClick={() => alert("bing")}>
        <i className="pi pi-shopping-cart"></i>
    </button>
  );
}

export default ShoppingCart;
