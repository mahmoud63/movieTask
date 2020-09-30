import React from "react";
import $ from "jquery";

window.jQuery = $;
window.$ = $;
global.jQuery = $;

const Fav = React.lazy(() => import("./movies/Fav"));
const Search = React.lazy(() => import("./movies/Search"));

const Logout = React.lazy(() => import("./movies/Authentication/Logout"));

const routes = [
  {
    path: "/movies",
    exact: true,
    name: "Default",
    component: Search,
  },
  {
    path: "/fav",
    exact: true,
    name: "Default",
    component: Fav,
  },

  {
    path: "/auth/logout",
    exact: true,
    name: "Logout",
    component: Logout,
  },
];

export default routes;
