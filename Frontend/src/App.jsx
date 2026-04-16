import { Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";
import SystemView from "./SystemView";
import HomeButton from "./HomeButton";
import Footer from "./Footer";
import Legal from "./Legal";

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
              <h1 id="headtitle">AquaLifeline</h1>
              <button className="loginnav" onClick={() => navigate("/login")}>
                LOGIN
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
            <Legal/>
          </>
        }
      />
    </Routes>
  );
}

export default App;
