import { Box, Container, Text, useColorModeValue } from '@chakra-ui/react';

const Home = () => (
  <Container maxW="5xl" py="4">
    <Box
      bg="#87CEFA"
      boxShadow={useColorModeValue('sm', 'sm-dark')}
      borderRadius="lg"
      p={{ base: '7', md: '150' }}
    >
      <Text fontSize="4xl">Title</Text>
      <Text fontSize="4xl" fontWeight="bold" color="#339999">
        This is an easy-to-use time zone conversion software developed for
        multinational corporations, which can be used for meeting scheduling and
        time comparison and countdown of upcoming events!!!
      </Text>
    </Box>
  </Container>
);

export default Home;
