import { LinkProps, NavLink, useMatch, useResolvedPath } from 'react-router-dom';

import { Button, ButtonProps } from '@mantine/core';

export default function LinkButton({ to, size = 'sm', ...props }: LinkProps & ButtonProps): JSX.Element {
  const resolved = useResolvedPath(to);
  const match = useMatch({ path: resolved.pathname, end: true });

  return <Button component={NavLink} to={to} size={size} variant={match ? 'filled' : 'subtle'} {...props} />;
}
