import { Center, Stack, Tabs, TabsValue, Title } from '@mantine/core';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

export default function MainLayout(): JSX.Element {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <Center sx={{ flexDirection: 'column' }}>
      <Title order={1} sx={{ margin: '0.825rem auto 0.5rem' }}>
        React Data Table
      </Title>
      <Stack justify="center" spacing="md" sx={{ maxWidth: 1140, width: '100%' }} mb="lg">
        <Tabs
          value={pathname.replace('/', '')}
          variant="outline"
          sx={{ fontWeight: 'bold' }}
          onTabChange={(value: TabsValue) => navigate(`${value}`)}
        >
          <Tabs.List>
            <Tabs.Tab value="employees" sx={{ fontWeight: 'bold' }}>
              Employee Management
            </Tabs.Tab>
            <Tabs.Tab value="menu-css" sx={{ fontWeight: 'bold' }}>
              Menu Css Challenge
            </Tabs.Tab>
          </Tabs.List>
        </Tabs>
        <Outlet />
      </Stack>
    </Center>
  );
}
