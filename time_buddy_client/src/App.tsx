import { Box, Container } from '@chakra-ui/react';
import { Routes, Route, Outlet } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";
import Home from './pages/home';
import TimeConverter from './pages/time-converter';
import Calendar from './pages/calendar';
import Support from './pages/support';
import LoginButton from "./components/login-button";
import LogoutButton from "./components/logout-button";
import UserProfile from "./components/profile";
import Navbar from './components/navbar';

const Layout = () => (
  <Box height="100vh" overflowY="auto">
    <Navbar />
    <Container pt={{ base: '8', lg: '12' }} pb={{ base: '12', lg: '24' }}>
      <Outlet />
    </Container>
  </Box>
);

function App() {
  const { isLoading, error } = useAuth0();
 
 <Routes>
  <Route path="/" element={<Layout />}>
    <Route index element={<Home />} />
    <Route path="time-converter" element={<TimeConverter />} />
    <Route path="calendar" element={<Calendar />} />
    <Route path="support" element={<Support />} />
    
  </Route>
 </Routes>
 
  return (
    <div className="App">
      <h1>Auth0 Login</h1>
        <LoginButton />
        <LogoutButton />
    </div>
    
  );
}

/*const App = () => (
  <Routes>
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="time-converter" element={<TimeConverter />} />
      <Route path="calendar" element={<Calendar />} />
      <Route path="support" element={<Support />} />
      
    </Route>
  </Routes>
);*/
//temporarily removed while figuring out auth0

export default App;
