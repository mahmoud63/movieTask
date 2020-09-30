import React from "react";

const Auth = React.lazy(() => import("./movies/Authentication"));

const route = [{ path: "/auth", exact: true, name: "Login", component: Auth }];

export default route;
