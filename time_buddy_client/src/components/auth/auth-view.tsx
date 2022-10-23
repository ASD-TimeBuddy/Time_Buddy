import { useAuth0 } from '@auth0/auth0-react';

import LoginButton from './login-button';
import UserProfile from './user-profile';

const AuthView = () => {
  const { isAuthenticated } = useAuth0();

  return isAuthenticated ? <UserProfile /> : <LoginButton />;
}

export default AuthView;
