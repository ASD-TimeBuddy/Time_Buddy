import { Link as RRLink } from 'react-router-dom';
import { As, Button, ButtonProps, HStack, Icon, Text } from '@chakra-ui/react';

interface NavButtonProps extends ButtonProps {
  icon: As;
  label: string;
  to: string;
}

const NavButton = (props: NavButtonProps) => {
  const { icon, label, to, ...buttonProps } = props;
  return (
    <Button
      as={RRLink}
      to={to}
      variant="ghost-on-accent"
      justifyContent="start"
      {...buttonProps}
    >
      <HStack spacing="3">
        <Icon as={icon} boxSize="6" color="on-accent-subtle" />
        <Text>{label}</Text>
      </HStack>
    </Button>
  );
};

export default NavButton;
