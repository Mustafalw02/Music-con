import React from 'react';
import {AuthProvider} from './AuthProvider';
import Routes from './Routes';

const Providers = ({theme}) => {
  return (
    <AuthProvider>
      <Routes theme={theme} />
    </AuthProvider>
  );
};

export default Providers;
