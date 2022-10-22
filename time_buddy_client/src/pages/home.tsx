import { Text } from '@chakra-ui/react';
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "../components/login-button";
import LogoutButton from "../components/logout-button";
import UserProfile from "../components/user-profile";

//const Home = () => <Text>Add Marketing page here...</Text>;

function Auth() {
    const { isLoading, error } = useAuth0();
    
    return (
       <div className="App">
         <h1>Auth0 Login</h1>
           <LoginButton />
           <LogoutButton />
       </div>     
    );
}

export default Auth;
