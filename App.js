import {
  DefaultTheme as PaperDefaultTheme,
  Provider as PaperProvider,
} from 'react-native-paper';
import React from 'react';
import {DefaultTheme as NavigationDefaultTheme} from '@react-navigation/native';

import Providers from './src/navigation';

const App = () => {
  const CustomDefaultTheme = {
    ...NavigationDefaultTheme,
    ...PaperDefaultTheme,
    colors: {
      ...NavigationDefaultTheme.colors,
      ...PaperDefaultTheme.colors,
      background: '#ffffff',
      text: '#333333',
    },
  };

  return (
    <PaperProvider theme={CustomDefaultTheme}>
      <Providers theme={CustomDefaultTheme} />
    </PaperProvider>
  );
};

export default App;
