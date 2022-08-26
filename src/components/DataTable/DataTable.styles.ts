import { Theme } from '@emotion/react';
import styled from '@emotion/styled';
import { createPolymorphicComponent, UnstyledButton, UnstyledButtonProps } from '@mantine/core';

export const Th = styled.th`
  padding: 0 !important;
`;

export const Button = createPolymorphicComponent<'button', UnstyledButtonProps>(styled(UnstyledButton)`
  font-weight: inherit;
  width: 100%;
  padding: 7px 10px;
  &:hover {
    background-color: ${({ theme }: { theme: Theme }) =>
      theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme?.colors.gray[0]};
  }
`);

export const Span = styled.span`
  width: 21px;
  height: 21px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
