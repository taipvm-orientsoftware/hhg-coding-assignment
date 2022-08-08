import { Center, Stack, Title } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { Outlet } from 'react-router-dom';

import { LinkButton } from '../../components';

export default function MainLayout() {
  const desktopScreen = useMediaQuery('(min-width: 1025px)');

  return (
    <Stack align="center" justify="center" spacing="md">
      <Title order={1} sx={{ margin: '2rem auto 1.5rem' }}>
        HHG Coding Assignment
      </Title>
      <Center
        sx={{
          justifyContent: 'space-between',
          maxWidth: '31.25rem',
          width: '100%'
        }}
      >
        <LinkButton to="employees" size={desktopScreen ? 'sm' : 'xs'}>
          Employee Management
        </LinkButton>
        <LinkButton to="css-menu" size={desktopScreen ? 'sm' : 'xs'}>
          Menu Css Challenge
        </LinkButton>
      </Center>
      <Outlet />
    </Stack>
  );
}
