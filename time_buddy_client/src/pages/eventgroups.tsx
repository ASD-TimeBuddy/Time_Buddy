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

const EventGroup = () => (
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
            Event Groups
          </Text>
          <Text fontSize="sm" color="muted">
            Join an event group.
          </Text>
          <FormControl isRequired>
            <Input
              type="password"
              fontSize="sm"
              color="muted"
              placeholder="Enter password"
              value={group_password}
            />
          </FormControl>

          <Button
            bg="bg-accent"
            color="on-accent"
            size="sm"
            width="100px"
            onClick={joinGroup}
          >
            Join
          </Button>
        </Stack>
      </Stack>
    </Box>
  </Container>
);
const joinGroup = () => console.log('join group');

export default EventGroup;
