import SideBar from "./sidebar";
import "./sidebar.css";
import { Outlet } from "react-router-dom";
const Admin = () => {
  return (
    <div className="admin">
      <div className="sidebar">
        <SideBar />
      </div>
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
};
export default Admin;
