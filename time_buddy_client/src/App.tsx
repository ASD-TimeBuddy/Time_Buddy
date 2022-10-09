import { Box, Container } from '@chakra-ui/react';
import { Routes, Route, Outlet } from 'react-router-dom';

import Home from './pages/home';
import TimeConverter from './pages/time-converter';
import Calendar from './pages/calendar';
import Support from './pages/support';
import Login from './pages/login';

import Navbar from './components/navbar';

const Layout = () => (
  <Box height="100vh" overflowY="auto">
    <Navbar />
    <Container pt={{ base: '8', lg: '12' }} pb={{ base: '12', lg: '24' }}>
      <Outlet />
    </Container>
  </Box>
);

const App = () => (
  <Routes>
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="time-converter" element={<TimeConverter />} />
      <Route path="calendar" element={<Calendar />} />
      <Route path="support" element={<Support />} />
      <Route path="login" element={<Login />} />
    </Route>
  </Routes>
);

export default App;
