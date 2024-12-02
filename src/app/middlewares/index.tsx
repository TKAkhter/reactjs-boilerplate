import React from "react";
import { useSelector } from "react-redux";
// Import { useDispatch, useSelector } from "react-redux";
// Import { useHistory } from "react-router-dom";
import { AuthMiddlewareProps, StoreRootState } from "../types";
// Import { jwtDecode } from "jwt-decode";

const AuthMiddleware: React.FC<AuthMiddlewareProps> = ({ children }) => {
  const token = useSelector((state: StoreRootState) => state.user.token);
  console.log("🚀 ~ token:", token);
  // Const history = useHistory();
  // Const decodedToken = jwtDecode(token as string);
  // Const currentTime = Date.now() / 1000;
  // Const dispatch = useDispatch();

  // React.useEffect(() => {
  //   If (!token || decodedToken.exp! < currentTime) {
  //     Dispatch({
  //       Type: "CLEAR_TOKEN",
  //     });
  //     History.push("/login");
  //   }
  // }, [token, history]);

  return <>{children}</>;
};

export default AuthMiddleware;
