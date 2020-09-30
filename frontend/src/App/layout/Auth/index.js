import React, { useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import * as actions from "../../../store/actions";
import routes from "../../../route";

const Auth = (props) => {
  let { authRedirectPath, onSetAuthRedirectPath } = props;
  const AuthProps = { ...props };

  var ScWidth = Math.max(window.screen.width, window.innerWidth);
  //console.log(ScWidth);
  var ScHeight = Math.max(window.screen.height, window.innerHeight);

  useEffect(() => {
    if (authRedirectPath !== "/") {
      onSetAuthRedirectPath();
    }
  }, [authRedirectPath, onSetAuthRedirectPath]);

  useEffect(() => {
    setTimeout(() => {
      window.dispatchEvent(new Event("resize"));
    }, 1000);
  }, []);

  const allRoutes = routes.map((route, index) => {
    return route.component ? (
      <Route
        key={index}
        path={route.path}
        exact={route.exact}
        name={route.name}
        render={(props) => <route.component {...props} {...AuthProps} />}
      />
    ) : null;
  });

  return (
    <>
      <div className="mainContainer px-0 h-100">
        {/* Main content */}
        <div className="row no-gutters">
          <div className="col h-100">
            <div className="container-fluid px-0 h-100">
              {/* (Side image + content) */}
              <div className="row no-gutters is-flex">
                <Switch>
                  {allRoutes}
                  <Redirect to="/auth" />
                </Switch>
              </div>
            </div>
          </div>
        </div>

        <div className="row no-gutters auth-footer"></div>
      </div>

      <style>{`
		html, body{
			height:100%; padding: 0; margin: 0;
			background-color: #33353A;
			font-family: 'Raleway', sans-serif;
			//zoom: ${ScWidth >= 1520 ? "95.3%" : "85.1%"};
			//-moz-transform: scale(95%);
			//top: -48px; left: 0;
		}
		p{margin: 0;}
		#root {height:100%}
		.mainContainer{
      
			max-width: ${ScWidth > 1024 ? ScWidth * 0.792 + "px" : "100%"};
			//max-width: ${ScWidth > 1024 ? "1365px" : "100%"};
			margin: 0 auto;
		}
		.imgContent{
			max-height: 880px;
		}


		.form-control , .react-tel-input .form-control{
			background: transparent; 
			color: rgba(29, 34, 38, 0.5); 
			width:100%;    
			padding-left: 0px;
			padding-bottom:12px;
			font-size:14px;
			border-color: #999; border-style: solid; 
			border-width: 0 0 1px 0; border-radius: 0;
		}
		
		.form-control:focus , .react-tel-input .form-control:focus { 
				background: transparent; color: rgba(29, 34, 38, 0.5); 
				border-color: rgba(29, 34, 38, 0.5);
				-webkit-box-shadow: none; box-shadow: none; 
		}
		/* Chrome, Firefox, Opera, Safari 10.1+ */
		.form-control::placeholder , .react-tel-input .form-control::placeholder { 
			font-size: 14px; color: rgba(29, 34, 38, 0.5); opacity: 1;/* Firefox */ }
		/* Internet Explorer 10-11 */
		.form-control:-ms-input-placeholder , .react-tel-input .form-control:-ms-input-placeholder { 
			font-size: 14px; color: rgba(29, 34, 38, 0.5); }
		/* Microsoft Edge */
		.form-control::-ms-input-placeholder , .react-tel-input .form-control::-ms-input-placeholder { 
			font-size: 14px; color: rgba(29, 34, 38, 0.5); }
		
		input:-webkit-autofill,
		input:-webkit-autofill:hover, 
		input:-webkit-autofill:focus,
		textarea:-webkit-autofill,
		textarea:-webkit-autofill:hover,
		textarea:-webkit-autofill:focus,
		select:-webkit-autofill,
		select:-webkit-autofill:hover,
		select:-webkit-autofill:focus {
			border-color: #999; border-style: solid; border-width: 0 0 1px 0;
			border-radius: 0;
			-webkit-text-fill-color:#333;
			box-shadow: inset;
			-webkit-box-shadow: 0 0 0px 1000px transparent inset;
			transition: background-color 5000s ease-in-out 0s;
		}

		
	`}</style>
    </>
  );
};

// max-width: ${ScWidth > 1024 ? (ScWidth * 0.792) + 'px' : '100%'};
const mapStateToProps = (state) => {
  return {
    isLoading: state.auth.loading,
    error: state.auth.error,
    successMsg: state.auth.successMsg,
    isAuthenticated: state.auth.token !== null,
    authRedirectPath: state.auth.authRedirectPath,
    currentStep: state.auth.currentStep,
    isNotComplete: state.auth.isNotComplete,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    unsetError: () => dispatch(actions.unsetError()),
    authCheckResetToken: (token) =>
      dispatch(actions.authCheckResetToken(token)),
    handleAuthentication: (authType, formData) =>
      dispatch(actions.handleAuthentication(authType, formData)),
    onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath("/")),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
