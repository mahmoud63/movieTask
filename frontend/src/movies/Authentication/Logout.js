import React, { useEffect } from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actions from '../../store/actions/index';

const Logout = ({ onLogout }) => {
  useEffect(() => {
    onLogout();
  });

  return <Redirect to="/auth" />;
};

const mapDispatchToProps = dispatch => {
  return {
    onLogout: () => dispatch(actions.logout())
  };
};

export default withRouter(
	connect(
		null,
		mapDispatchToProps
	)(Logout)
);
