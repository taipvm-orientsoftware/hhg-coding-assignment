import { Button, Center, Heading, VStack } from '@chakra-ui/react';
import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';

export default function Home(): JSX.Element {
  useEffect(() => {
    document.title = 'HHG coding assignment';
  }, []);

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
      </VStack>
    </div>
  );
}
