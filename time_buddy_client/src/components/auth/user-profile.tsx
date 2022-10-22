import { Avatar, Box, HStack, Text, CircularProgress} from '@chakra-ui/react';
import { useAuth0 } from '@auth0/auth0-react';

import LogoutButton from './logout-button';

const UserProfile = () => {
  const { user, isLoading } = useAuth0();
 
  if (isLoading) {
    return <CircularProgress />;
  }
  return (
    <HStack spacing="3" ps="2">
      <Avatar name={user?.name} src={user?.image} boxSize="10" />
      <Box>
        <Text color="on-accent" fontWeight="medium" fontSize="sm">
          {user?.name}
        </Text>
        <Text color="on-accent-muted" fontSize="sm">
          {user?.email}
        </Text>
      </Box>
      <LogoutButton />
    </HStack>
  );
};

export default UserProfile;
