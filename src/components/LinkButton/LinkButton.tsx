import { Button, ButtonProps } from '@mantine/core';
import { LinkProps, NavLink, useMatch, useResolvedPath } from 'react-router-dom';

export default function LinkButton({ children, to, size = 'sm', ...props }: LinkProps & ButtonProps) {
  const resolved = useResolvedPath(to);
  const match = useMatch({ path: resolved.pathname, end: true });

  return (
    <Button component={NavLink} to={to} {...props} size={size} variant={match ? 'filled' : 'subtle'}>
      {children}
    </Button>
  );
}
