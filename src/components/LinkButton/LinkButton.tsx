import { Button, ButtonProps } from '@chakra-ui/react';
import { Link, LinkProps, useMatch, useResolvedPath } from 'react-router-dom';

export default function LinkButton({ children, to, size = 'sm', ...props }: LinkProps & ButtonProps) {
  const resolved = useResolvedPath(to);
  const match = useMatch({ path: resolved.pathname, end: true });

  return (
    <Button as={Link} to={to} {...props} size={size} colorScheme={match ? 'messenger' : 'gray'}>
      {children}
    </Button>
  );
}
