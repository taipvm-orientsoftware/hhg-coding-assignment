import { MantineProvider } from '@mantine/core';
import { BrowserRouter } from 'react-router-dom';

import Routes from '../routes/Routes';
import theme from '../theme';

export default function App(): JSX.Element {
  return (
    <MantineProvider theme={theme} withGlobalStyles withNormalizeCSS>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </MantineProvider>
  );
}
