import type { MantineTheme } from '@mantine/core';

import '@emotion/react';

declare module '@emotion/react' {
  export interface Theme extends MantineTheme {}
}
