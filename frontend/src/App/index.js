import React, { Suspense, useEffect } from "react";
import { Route, Switch, withRouter, useLocation } from "react-router-dom";
import Loadable from "react-loadable";
import { connect } from "react-redux";

import "../../node_modules/font-awesome/scss/font-awesome.scss";
import "react-toastify/dist/ReactToastify.css";
import "../assets/scss/style.scss";

import { toast } from "react-toastify";
import Loader from "./layout/Loader";
import * as actions from "../store/actions";

const AdminLayout = Loadable({
  loader: () => import("./layout/AdminLayout"),
  loading: Loader,
});

const AuthLayout = Loadable({
  loader: () => import("./layout/Auth"),
  loading: Loader,
});

const App = (props) => {
  const location = useLocation();

  useEffect(() => {
    props.autoSignIn();

    toast.configure({
      style: { fontWeight: "bold" },
      className: "text-center",
    });
  }, []);

  return (
    <Suspense fallback={<Loader />}>
      <Switch>
        <Route
          path="/"
          component={props.isLoggedIn ? AdminLayout : AuthLayout}
        />
      </Switch>
    </Suspense>
  );
};

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.auth.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    autoSignIn: () => dispatch(actions.authCheckState()),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
