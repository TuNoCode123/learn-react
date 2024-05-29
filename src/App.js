import { Outlet } from "react-router-dom";
import "./App.css";
import Home from "./component/home/navbar";
function App() {
  return (
    <>
      <div>
        <Home />
      </div>
      <div className="home-content">
        <Outlet />
      </div>
    </>
  );
}

export default App;
