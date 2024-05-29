import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";

const PrivateRouter = (props) => {
  const isLogin = useSelector((state) => state.login.accessToken);
  if (!isLogin) {
    return <Navigate to={"/login"}></Navigate>;
  }
  return <>{props?.children}</>;
};
export default PrivateRouter;
