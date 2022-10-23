import { useState } from 'react';
import { Link as RRLink } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  Stack,
  FormControl,
  Input,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';

const joinOrg = () => console.log('join organisation');

const Organisation = () => {
  const [organisationId] = useState('');

  return (
    <Container maxW="3xl" py="4">
      <Box
        bg="bg-surface"
        boxShadow={useColorModeValue('sm', 'sm-dark')}
        borderRadius="lg"
        p={{ base: '4', md: '6' }}
      >
        <Stack spacing="5">
          <Stack spacing="3">
            <Text fontSize="lg" fontWeight="medium">
              Organisation
            </Text>
            <Text fontSize="sm" color="muted">
              Join an organisation.
            </Text>
            <FormControl isRequired>
              <Input
                type="text"
                fontSize="sm"
                color="muted"
                placeholder="Enter a unique 6 digit ID"
                value={organisationId}
              />
            </FormControl>
            <Button
              bg="bg-accent"
              color="on-accent"
              size="sm"
              width="100px"
              as={RRLink}
              to="/eventgroups"
              onClick={joinOrg}
            >
              Join
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Container>
  );
};

export default Organisation;
