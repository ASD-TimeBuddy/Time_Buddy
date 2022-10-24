import { Link as RRLink } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  Stack,
  useColorModeValue,
} from '@chakra-ui/react';

const LoginButton = () => (
  <Container maxW="3xl" py="4">
    <Box
      bg="bg-surface"
      boxShadow={useColorModeValue('sm', 'sm-dark')}
      borderRadius="lg"
      p={{ base: '4', md: '6' }}
    >
      <Stack spacing="5">
        <Stack spacing="3">
          <Button
            bg="bg-accent"
            color="on-accent"
            size="sm"
            width="100px"
            as={RRLink}
            to="/eventgroups"
          >
            Login
          </Button>
        </Stack>
      </Stack>
    </Box>
  </Container>
);

export default LoginButton;

