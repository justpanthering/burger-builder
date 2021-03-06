import React, {useEffect} from 'react';
import {Redirect} from 'react-router-dom';
import {logout} from '../../../Store/actions/index';
import {connect} from 'react-redux';

const Logout = props => {
  useEffect(() => {
    props.onLogout();
  }, []);
  
    return (
      <Redirect to="/"/>
    );
  }

const mapDispatchToProps = dispatch => {
  return {
    onLogout: () => dispatch(logout())
  }
}

export default connect(null, mapDispatchToProps)(Logout);