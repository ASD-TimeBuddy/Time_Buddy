import {
  Stack,
  Flex,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Heading,
  Text,
  Divider,
} from '@chakra-ui/react';

import FrequentlyAskedQuestions from '../components/support/frequently-asked-questions';

const Support = () => (
  <>
    <Heading size="md" mb="8">
      Time Buddy Support
    </Heading>
    <Tabs variant="soft-rounded" colorScheme="blue">
      <Flex justify="center">
        <TabList>
          <Tab mx="4" data-testid="faq-button">
            FAQ
          </Tab>
          <Tab mx="4" data-testid="contact-button">
            Contact Us
          </Tab>
        </TabList>
      </Flex>

      <TabPanels>
        <TabPanel data-testid="faq-panel">
          <FrequentlyAskedQuestions />
        </TabPanel>
        <TabPanel data-testid="contact-panel">
          <Stack spacing="5">
            <Text fontSize="lg" fontWeight="medium">
              Have a problem? Contact us
            </Text>
            <Divider />
            <Text>Coming soon...</Text>
          </Stack>
        </TabPanel>
      </TabPanels>
    </Tabs>
  </>
);

export default Support;
