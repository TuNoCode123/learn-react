import { Routes, Route } from "react-router-dom";
import Admin from "./component/admin/admin";
import House from "./component/home/home";
import ManageUser from "./component/admin/content/manageUser";
import Login from "./component/auth/login";
import App from "./App";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Register from "./component/auth/register";
import Quizz from "./component/user/quizz";
import DetailQuizz from "./component/user/detailQuizz";
import ManageQuizz from "./component/admin/content/quizz/manageQUizz";
import ManagerQuestion from "./component/admin/content/question/managerQs";
import PrivateRouter from "./component/auth/privateRouter";
import Dashboard from "./component/dashboard/dashboard";
import ChangePass from "./component/auth/changePass";
const Layout = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<House />} />
          <Route
            path="user"
            element={
              <PrivateRouter>
                <Quizz />
              </PrivateRouter>
            }
          />
        </Route>
        <Route
          path="admin"
          element={
            <PrivateRouter>
              <Admin />
            </PrivateRouter>
          }
        >
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="manage" element={<ManageUser />} />
          <Route path="quizz" element={<ManageQuizz />} />
          <Route path="question" element={<ManagerQuestion />} />
        </Route>
        <Route path="login" element={<Login />} />
        <Route path="sing-up" element={<Register />} />
        <Route path="quizz/:id" element={<DetailQuizz />} />
        <Route path="changePW" element={<ChangePass />} />
      </Routes>
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
    </>
  );
};
export default Layout;
