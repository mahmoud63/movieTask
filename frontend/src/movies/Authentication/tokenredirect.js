import React, {useEffect} from 'react';
import { NavLink, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actions from '../../store/actions';

function TokenRedirect({ 
  autoCheckProfile, error, isAuthenticated, isNotComplete, authRedirectPath, unsetError
}){
	
  useEffect(() => {
    // check for token
    const search = window.location.search;
    const params = new URLSearchParams(search);
    const token = params.get('token');
	  if (token) autoCheckProfile(token);				
	}, []);

	let errorMessage = null;
  if ( error) { 
		console.log('error: ', error);
		errorMessage =  
			<div className="alert alert-danger rounded col-8 mx-auto text-center">
				{ error.message } <br/>
        <br/>Back to <NavLink to="/auth" onClick={unsetError}>login</NavLink> Page
			</div> ;
	}

  let authRedirect = null;
  if ( isAuthenticated || isNotComplete ) {
		console.log('should be redirected', authRedirectPath);
    authRedirect = <Redirect to={authRedirectPath} />;
  }


	return(
  <>	
    {authRedirect}
    {errorMessage} {/* To handle any errors */}
	  
    <style>{`
		  body{background-color: #fff;}
		  .sideMenu{display:none}
		  .copyRightFooter{display:none}
	  `}</style>
  </>
  );
}

const mapDispatchToProps = dispatch => {
  return {
    autoCheckProfile: token => dispatch(actions.authCheckProfile(token)),
  };
};

export default connect(null, mapDispatchToProps)(TokenRedirect);