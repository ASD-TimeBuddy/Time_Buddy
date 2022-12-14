import { Link as RRLink } from 'react-router-dom';
import {
  Box,
  Button,
  ButtonGroup,
  Container,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  Flex,
  HStack,
  IconButton,
  useBreakpointValue,
  useDisclosure,
} from '@chakra-ui/react';
import { FiHelpCircle } from 'react-icons/fi';

import AuthView from './auth/auth-view';
import Sidebar from './sidebar';
import Logo from './logo';
import ToggleButton from './toggle-button';

const Navbar = () => {
  const isDesktop = useBreakpointValue({ base: false, lg: true });
  const { isOpen, onToggle, onClose } = useDisclosure();

  return (
    <Box
      as="nav"
      bg="bg-accent"
      color="on-accent"
      data-testid="navbar-container"
    >
      <Container py={{ base: '3', lg: '4' }}>
        <Flex justify="space-between">
          <HStack spacing="4">
            <Logo />
            {isDesktop && (
              <ButtonGroup variant="ghost-on-accent" spacing="1">
                <Button as={RRLink} to="/">
                  Home
                </Button>
                <Button as={RRLink} to="/time-converter">
                  International Time Converter
                </Button>
                <Button as={RRLink} to="/events">
                  Events
                </Button>
                <Button as={RRLink} to="/organisation">
                  Organisation
                </Button>
              </ButtonGroup>
            )}
          </HStack>
          {isDesktop ? (
            <HStack spacing="4">
              <ButtonGroup variant="ghost-on-accent" spacing="1">
                <IconButton
                  as={RRLink}
                  to="/support"
                  icon={<FiHelpCircle fontSize="1.25rem" />}
                  aria-label="Support"
                  data-testid="support-link"
                />
              </ButtonGroup>
              <AuthView />
            </HStack>
          ) : (
            <>
              <ToggleButton
                isOpen={isOpen}
                aria-label="Open Menu"
                onClick={onToggle}
              />
              <Drawer
                isOpen={isOpen}
                placement="left"
                onClose={onClose}
                isFullHeight
                preserveScrollBarGap
                // Only disabled for showcase
                trapFocus={false}
              >
                <DrawerOverlay />
                <DrawerContent>
                  <Sidebar />
                </DrawerContent>
              </Drawer>
            </>
          )}
        </Flex>
      </Container>
    </Box>
  );
};

export default Navbar;
