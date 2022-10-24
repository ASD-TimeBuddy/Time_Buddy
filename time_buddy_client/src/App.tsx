import { Box, Container } from '@chakra-ui/react';
import { Routes, Route, Outlet } from 'react-router-dom';
import Home from './pages/home';
import TimeConverter from './pages/time-converter';
import Events from './pages/events';
import Support from './pages/support';
import Navbar from './components/navbar';
import Organisation from './pages/organisation';
import EventGroup from './pages/eventgroups';

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
      <Route path="events" element={<Events />} />
      <Route path="organisation" element={<Organisation />} />
      <Route path="eventgroups" element={<EventGroup />} />
      <Route path="support" element={<Support />} />
    </Route>
  </Routes>
);

export default App;
