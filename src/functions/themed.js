import React from 'react';
import { ThemeProvider } from 'styled-components';
import theme from '../constants/theme';

const Themed = (Component) => (props) => (
  <ThemeProvider theme={theme}>
    <Component {...props} />
  </ThemeProvider>
);

export default Themed;
