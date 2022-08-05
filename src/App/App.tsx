import { MantineProvider } from '@mantine/core';
import { BrowserRouter } from 'react-router-dom';

import { ErrorBoundary } from '../components';
import Routes from '../routes/Routes';
import theme from '../theme';

export default function App(): JSX.Element {
  return (
    <MantineProvider theme={theme} withGlobalStyles withNormalizeCSS>
      <ErrorBoundary>
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </ErrorBoundary>
    </MantineProvider>
  );
}
