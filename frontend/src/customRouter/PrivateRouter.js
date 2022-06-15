import { Navigate, Outlet } from "react-router-dom";

const PrivateRouter = ({ props }) => {
  const firstLogin = localStorage.getItem("firstLogin");

  //   return firstLogin ? (
  //     <Route {...props} />
  //   ) : (
  //     <Route path="/" element={<Navigate to="/" />} />
  //   );

  return firstLogin ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRouter;
