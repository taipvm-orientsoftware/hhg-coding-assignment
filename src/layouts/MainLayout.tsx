/* eslint-disable no-console */
import { Center, Stack, Title } from '@mantine/core';
import { Outlet } from 'react-router-dom';

import { LinkButton } from '../components';

export default function MainLayout() {
  return (
    <Stack align="center" justify="center" spacing="md">
      <Title order={1} sx={{ margin: '2rem auto' }}>
        HHG Coding Assignment
      </Title>
      <Center
        sx={{
          justifyContent: 'space-between',
          maxWidth: '31.25rem',
          width: '100%'
        }}
      >
        <LinkButton to="employee" size="xs">
          Employee Management
        </LinkButton>
        <LinkButton to="css-menu" size="xs">
          Menu Css Challenge
        </LinkButton>
      </Center>
      <Outlet />
    </Stack>
  );
}
