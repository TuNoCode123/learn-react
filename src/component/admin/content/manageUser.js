import Example from "./adduser";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const ManageUser = () => {
  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <div className="adduser">
        <Example />
      </div>
      <div className="hr"></div>
      <div className="user-content">fdsfafew</div>
    </div>
  );
};
export default ManageUser;
