import { extendTheme } from '@chakra-ui/react';

import components from './components';
import styles from './styles';
import fonts from './typography';

const theme = {
  fonts,
  styles,
  components
};

export default extendTheme(theme);
