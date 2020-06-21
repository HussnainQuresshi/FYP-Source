import React from "react";
import { Route, Redirect } from "react-router-dom";
import { getCurrentAdmin } from "../../services/adminService";
const ProtectedRoute = ({ path, component: Component, render, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (!getCurrentAdmin())
          return (
            <Redirect
              to={{ pathname: "/AdminLogin", state: { from: props.location } }}
            />
          );
        return Component ? <Component {...props} /> : render(props);
      }}
    />
  );
};
export default ProtectedRoute;
