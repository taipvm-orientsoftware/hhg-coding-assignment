import { Button, ButtonProps } from '@mantine/core';
import { LinkProps, NavLink, useMatch, useResolvedPath } from 'react-router-dom';

export default function LinkButton({ to, size = 'sm', ...props }: LinkProps & ButtonProps) {
  const resolved = useResolvedPath(to);
  const match = useMatch({ path: resolved.pathname, end: true });

  return <Button component={NavLink} to={to} size={size} variant={match ? 'filled' : 'subtle'} {...props} />;
}
