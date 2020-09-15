import React, {useState, useEffect} from 'react';

import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Aux/Aux';

const withErrorHandler = (WrappedComponent, axios) => {
  return props => {
    
    const [showError, setShowError] = useState(false);

    const respInterceptor = axios.interceptors.response.use(null, error => {
        if(error)
          setShowError(!showError);
      })

    useEffect(() => {
        axios.interceptors.response.eject(respInterceptor);
      }, []);

    const toggleErrorHandler = () => {
      setShowError(!showError);
    }

      return (
        <Aux>
          <Modal show={showError} closeBackDrop={toggleErrorHandler}>
            Something Went Wrong...
          </Modal>
          <WrappedComponent {...props} />
        </Aux>
      );
  };
}

export default withErrorHandler;