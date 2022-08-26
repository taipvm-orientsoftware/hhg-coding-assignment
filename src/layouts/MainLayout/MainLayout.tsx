import { Center, SegmentedControl, Stack, Title } from '@mantine/core';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

export default function MainLayout(): JSX.Element {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <Center sx={{ flexDirection: 'column' }}>
      <Title order={1} sx={{ margin: '1rem auto' }}>
        React Data Table
      </Title>
      <Stack justify="center" spacing="md" sx={{ maxWidth: 1140, width: '100%' }} mb="lg">
        <SegmentedControl
          data={[
            { label: 'Employee Management', value: 'employee-management' }
            // { label: 'Menu CSS Challenge', value: 'menu-css' }
          ]}
          value={pathname.replace('/', '')}
          onChange={(value: string) => navigate(value)}
          sx={{ maxWidth: 768, alignSelf: 'center' }}
        />
        <Outlet />
      </Stack>
    </Center>
  );
}
