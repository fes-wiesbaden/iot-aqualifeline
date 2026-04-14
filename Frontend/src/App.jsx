import { Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";
import SystemView from "./SystemView";
import HomeButton from "./HomeButton";


function LoggedIn() {
  return <SystemView />;
}

function App() {
  const navigate = useNavigate();

  return (
    <Routes>
      <Route
        path="/"
        element={
          <header>
            <HomeButton />
            <h1>AquaLifeline</h1>
            <input placeholder="E-MAIL" />
            <input placeholder="PASSWORD" />
            <button className='submit' onClick={() => navigate("/loggedIn")}>
              LOGIN
            </button>
          </header>
        }
      />
      <Route path="/loggedIn" element={<><HomeButton /><LoggedIn /></>} />
    </Routes>
  );
}

export default App;
