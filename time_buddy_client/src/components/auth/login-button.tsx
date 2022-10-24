import { useAuth0 } from '@auth0/auth0-react';
import { Button } from '@chakra-ui/react';

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <Button
      bg="bg-accent"
      color="on-accent"
      variant="outline"
      onClick={() => loginWithRedirect()}
    >
      Sign In
    </Button>
  );
};

export default LoginButton;
