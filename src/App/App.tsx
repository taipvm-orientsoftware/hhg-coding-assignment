import { MantineProvider } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import { BrowserRouter } from 'react-router-dom';

import { ErrorBoundary } from '../components';
import Routes from '../routes/Routes';
import theme from '../theme';

export default function App(): JSX.Element {
  return (
    <MantineProvider theme={theme} withGlobalStyles withNormalizeCSS>
      <NotificationsProvider position="top-right" autoClose={2000}>
        <ErrorBoundary>
          <BrowserRouter>
            <Routes />
          </BrowserRouter>
        </ErrorBoundary>
      </NotificationsProvider>
    </MantineProvider>
  );
}
