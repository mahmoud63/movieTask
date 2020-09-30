import React from "react";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({
  component: Component,
  //auth: { isAuthenticated, loading },
  privilege,
  ...rest
}) => {
  console.log(privilege);
  return (
    <Route {...rest} render={(props) => <Component {...props} {...rest} />} />
  );
};

export default PrivateRoute;
