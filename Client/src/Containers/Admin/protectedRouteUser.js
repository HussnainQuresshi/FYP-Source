import React from "react";
import { Route, Redirect } from "react-router-dom";
import { getCurrentUser } from "../../services/userService";
const ProtectedRoute = ({ path, component: Component, render, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (!getCurrentUser())
          return (
            <Redirect
              to={{
                pathname: "/StudentLogin",
                state: { from: props.location },
              }}
            />
          );
        return Component ? <Component {...props} /> : render(props);
      }}
    />
  );
};
export default ProtectedRoute;
