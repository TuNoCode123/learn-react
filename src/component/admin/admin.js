import SideBar from "./sidebar";
import "./sidebar.css";
import { Outlet } from "react-router-dom";
import "react-perfect-scrollbar/dist/css/styles.css";
import PerfectScrollbar from "react-perfect-scrollbar";
const Admin = () => {
  return (
    <div className="admin">
      <div className="sidebar">
        <SideBar />
      </div>
      <div className="content">
        <PerfectScrollbar style={{ height: "95vh" }}>
          <Outlet />
        </PerfectScrollbar>
      </div>
    </div>
  );
};
export default Admin;
