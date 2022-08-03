import { Button, Center, Heading, Table, TableContainer, Tbody, Td, Th, Thead, Tr, VStack } from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';

export default function Home(): JSX.Element {
  return (
    <div id="home">
      <VStack maxW="full" justify="center" padding={6} spacing={8}>
        <Heading marginY={8}>HHG Coding Assignment</Heading>
        <Center maxW="2xl" w="full" justifyContent="space-around">
          <Button as={NavLink} to="/">
            Employee Management
          </Button>
          <Button as={NavLink} to="css-menu">
            Menu Css Challenge
          </Button>
        </Center>
        <TableContainer>
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
      </VStack>
    </div>
  );
}
