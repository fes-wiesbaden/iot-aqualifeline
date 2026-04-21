import { Routes, Route, useNavigate } from "react-router-dom";
import "./css/App.css";
import SystemView from "./SystemView";
import HomeButton from "./HomeButton";
import Footer from "./Footer";
import Legal from "./Legal";
import Shop from "./Shop";

function LoggedIn() {
  return (
    <>
      <SystemView />
      <Footer />
    </>
  );
}

function App() {
  const navigate = useNavigate();

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
                src="/AquaLifeline/landingpage1.jpg"
                alt="Aquarium"
                id="landingpage-pic"
              />
              <button className="loginnav" onClick={() => navigate("/login")}>
                GET STARTED
              </button>

              <button className="loginnav" onClick={() => navigate("/shop")}>
                SHOP
              </button>
            </div>
            <Footer />
          </>
        }
      />

      <Route
        path="/login"
        element={
          <>
            <div className="login">
              <HomeButton />
              <h1 id="logintitle">AquaLifeline</h1>
              <input placeholder="E-MAIL" />
              <input placeholder="PASSWORD" />
              <button className="submit" onClick={() => navigate("/loggedIn")}>
                LOGIN
              </button>
            </div>
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
            <Shop />
          </>
        }
      />
    </Routes>
  );
}

export default App;
