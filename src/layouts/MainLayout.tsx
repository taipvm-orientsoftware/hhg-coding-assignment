import { Center, Heading } from '@chakra-ui/react';
import { Button, Stack } from '@mantine/core';
import { Link, Outlet, useLocation, useMatch } from 'react-router-dom';

export default function MainLayout() {
  const location = useLocation();
  const match = useMatch({ path: location.pathname, end: true });

  return (
    <Stack justify="center" spacing={8}>
      <Heading marginY={8}>HHG Coding Assignment</Heading>
      <Center maxW="2xl" w="full" justifyContent="space-around">
        <Button component={Link} to="employee" size="sm" color={match ? 'blue' : 'gray'}>
          Employee Management
        </Button>
        <Button component={Link} to="css-menu" size="sm" color={match ? 'blue' : 'gray'}>
          Menu Css Challenge
        </Button>
      </Center>
      <Outlet />
    </Stack>
  );
}
