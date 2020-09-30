import React, { Component } from "react";
import { connect } from "react-redux";

import { Dropdown } from "react-bootstrap";

import * as actions from "../../../../store/actions/index";

class NavBar extends Component {
  render() {
    let headerClass = [
      "navbar",
      "pcoded-header",
      "navbar-expand-lg",
      this.props.headerBackColor,
    ];
    if (this.props.headerFixedLayout) {
      headerClass = [...headerClass, "headerpos-fixed"];
    }

    let toggleClass = ["mobile-menu"];
    if (this.props.collapseMenu) {
      toggleClass = [...toggleClass, "on"];
    }

    return (
      <>
        <header className={headerClass.join(" ")}>
          <div className="m-header">
            <a className="b-brand">
              <div className="b-bg">
                <i className="feather icon-trending-up" />
              </div>
              <span className="b-title">
                <strong>Movies</strong>
              </span>
            </a>
          </div>
          <a className="mobile-menu" id="mobile-header">
            <i className="feather icon-more-horizontal" />
          </a>
          <div className="collapse navbar-collapse">
            <>
              <>
                <ul className="navbar-nav mr-auto">
                  <li>
                    <a href="/fav">Favoriets</a>
                  </li>
                  <li>
                    <a href="/movies">Movies</a>
                  </li>
                </ul>
              </>
              <ul className="navbar-nav ml-auto">
                <li>
                  <Dropdown className="">
                    <Dropdown.Toggle variant={"link"} id="">
                      <i className="icon feather icon-settings" />
                    </Dropdown.Toggle>
                    <Dropdown.Menu alignRight className="profile-notification">
                      <ul className="pro-body">
                        <li>
                          <a href="/auth/logout" className="dropdown-item">
                            <i className="feather icon-log-out" /> Sign Out
                          </a>
                        </li>
                      </ul>
                    </Dropdown.Menu>
                  </Dropdown>
                </li>
              </ul>
            </>
          </div>
        </header>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    rtlLayout: state.template.rtlLayout,
    headerBackColor: state.template.headerBackColor,
    headerFixedLayout: state.template.headerFixedLayout,
    collapseMenu: state.template.collapseMenu,
    userName: state.auth.userName,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onToggleNavigation: () => dispatch(actions.collapseMenu()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
