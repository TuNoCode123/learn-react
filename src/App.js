import { Outlet } from "react-router-dom";
import "./App.css";
import Home from "./component/home/navbar";
function App() {
  return (
    <div>
      <Home />
      <Outlet></Outlet>
      <div>dfasfasfa</div>
    </div>
  );
}

export default App;
