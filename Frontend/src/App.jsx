import { Routes, Route, useNavigate } from "react-router-dom";
import "./css/App.css";
import SystemView from "./SystemView";
import HomeButton from "./HomeButton";
import Footer from "./Footer";
import Legal from "./Legal";
import Shop from "./Shop";
import Login from "./Login";
import Checkout from "./Checkout";
import LoadingScreen from "./LoadingScreen";
import AboutUs from "./AboutUs";
import { useState } from "react";

function LoggedIn() {
  return (
    <>
      <SystemView />
    </>
  );
}

function App() {
  const navigate = useNavigate();
  const [shoppingCart, setShoppingCart] = useState([]);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <div className="homepage">
              <HomeButton />
              <div className="greeting">
                <h1 id="headtitle">AquaLifeline.</h1>
                <h2 id="headsubtitle">Kleine Fische. Große Ansprüche.</h2>
              </div>
              <img
                src="/iot-aqualifeline/landingpage1.jpg"
                alt="Aquarium"
                id="landingpage-pic"
              />
              <button className="loginnav" onClick={() => navigate("/login")}>
                JETZT LOSLEGEN!
              </button>
            </div>
            <AboutUs />
            <Footer />
          </>
        }
      />

      <Route
        path="/login"
        element={
          <>
            <HomeButton />
            <Login />
            <Footer />
          </>
        }
      />

      <Route
        path="/loggedIn"
        element={
          <>
            <HomeButton />
            <LoggedIn />
            <Footer />
          </>
        }
      />

      <Route
        path="/legal"
        element={
          <>
            <HomeButton />
            <Legal />
          </>
        }
      />

      <Route
        path="/shop"
        element={
          <>
            <HomeButton />
            <Shop shoppingCart={shoppingCart} setShoppingCart={setShoppingCart}/>
            <Footer />
          </>
        }
      />

      <Route
        path="/checkout"
        element={
          <>
            <HomeButton />
            <Checkout shoppingCart={shoppingCart} setShoppingCart={setShoppingCart}/>
            <Footer />
          </>
        }
      />
    </Routes>
  );
}

export default App;
