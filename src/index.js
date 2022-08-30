import React from 'react';
import ReactDOM from 'react-dom/client';
import 'modern-normalize';
import { ThemeProvider } from 'styled-components';
import { App } from 'components/App/App';
import { theme } from 'utils/theme';
import { MyStyleReset } from 'utils/resetStyles';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <MyStyleReset />
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
