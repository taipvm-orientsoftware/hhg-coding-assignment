import { Group, Stack, Title } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { Outlet } from 'react-router-dom';

import { LinkButton } from '../../components';

export default function MainLayout(): JSX.Element {
  const largeScreen: boolean = useMediaQuery('(min-width: 1367px)');

  return (
    <Stack align="center" justify="center" spacing="md">
      <Title order={1} sx={{ margin: '1.5rem auto 1rem' }}>
        React Data Table
      </Title>
      <Group position="apart" sx={{ maxWidth: '31.25rem', width: '100%' }}>
        <LinkButton to="employees" size={largeScreen ? 'sm' : 'xs'}>
          Employee Management
        </LinkButton>
        <LinkButton to="menu-css" size={largeScreen ? 'sm' : 'xs'}>
          Menu Css Challenge
        </LinkButton>
      </Group>
      <Outlet />
    </Stack>
  );
}
