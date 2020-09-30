import React, { Component } from "react";
import { Switch, Redirect } from "react-router-dom";

import NavBar from "./NavBar";
import routes from "../../../routes";
import PrivateRoute from "../../../pRoute";

class AdminLayout extends Component {
  render() {
    const allRoutes = routes.map((route, index) => {
      return route.component ? (
        <PrivateRoute
          key={index}
          path={route.path}
          exact={route.exact}
          name={route.name}
          component={route.component}
          privilege={route.privilege}
          activeComponent={this.props.activeComponent}
          setActiveComponent={this.props.setActiveComponent}
          //render={props => <route.component {...props} />}
        />
      ) : null;
    });

    return (
      <>
        <NavBar />
        <div className="pcoded-main-container">
          <div className="pcoded-wrapper">
            <div className="pcoded-content">
              <div className="pcoded-inner-content">
                <div className="main-body">
                  <div className="page-wrapper">
                    <Switch>
                      {allRoutes}

                      <Redirect to="/fav" />
                    </Switch>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default AdminLayout;
