import { Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';

export default function Home(): JSX.Element {
  return (
    <TableContainer maxW="8xl">
      <Table size="sm" variant="striped">
        <Thead>
          <Tr>
            <Th width="4">No</Th>
            <Th width="2xl">Name</Th>
            <Th width="3xl">Email</Th>
            <Th width="2xl">Position</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>1</Td>
            <Td>Minh Tai</Td>
            <Td>minhtai.pv3598@gmail.com</Td>
            <Td>Software Engineer</Td>
          </Tr>
        </Tbody>
      </Table>
    </TableContainer>
  );
}
