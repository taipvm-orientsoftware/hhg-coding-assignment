import { BrowserRouter } from 'react-router-dom';

import { createEmotionCache, MantineProvider } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';

import { ErrorBoundary } from '../components';
import Routes from '../routes';
import theme from '../theme';

const cache = createEmotionCache({ key: 'nintendo', prepend: true });

export default function App() {
  return (
    <MantineProvider emotionCache={cache} theme={theme} withGlobalStyles withNormalizeCSS>
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
