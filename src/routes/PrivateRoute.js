import React, { useEffect, useState } from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../contexts/Auth";

export function PrivateRoute({ component: Component, roles, ...rest }) {
  const { user, userRole } = useAuth();
  let rctUser = userRole?.role ?? "proctor";

  return (
    <Route
      {...rest}
      render={(props) => {
        if (!user) {
          return <Redirect to="/login" />;
        }
        if (rctUser === "participant") {
          return <Redirect to="/login" />;
        }
        if (roles && roles.indexOf(rctUser) === -1) {
          return <Redirect to="/app" />;
        }
        return <Component {...props} />;
      }}
    />
  );
}
