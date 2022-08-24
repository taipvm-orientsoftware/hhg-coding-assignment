import { Theme } from '@emotion/react';
import styled from '@emotion/styled';
import { createPolymorphicComponent, UnstyledButton, UnstyledButtonProps } from '@mantine/core';

export const Th = styled.th`
  cursor: pointer;
  &:hover {
    background-color: ${({ theme }: { theme: Theme }) =>
      theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme?.colors.gray[0]};
  }
`;

export const Button = createPolymorphicComponent<'button', UnstyledButtonProps>(styled(UnstyledButton)`
  width: 100%;
  font-weight: inherit;
`);

export const Span = styled.span`
  width: 21px;
  height: 21px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
