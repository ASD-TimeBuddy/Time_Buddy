import { useState, useEffect, useMemo } from 'react';
import {
  Box,
  Stack,
  SimpleGrid,
  Divider,
  Text,
  Skeleton,
  useColorModeValue,
} from '@chakra-ui/react';
import useSWR from 'swr';

import format from 'date-fns/fp/format';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

import { eventsUrlBuilder } from '../constants/api';

type EventT = {
  event_id: string;
  summary: string;
  description: string;
  location: string;
  dt_start: string;
  dt_end: string;
  user: string | null;
  tz: number;
  attendees: string[];
};

type EventCardProps = {
  event: EventT;
};

const dateFormatString = 'do MMMM yyyy hh:mm aa';
const dateFormatter = format(dateFormatString);

const EventCard = ({ event }: EventCardProps) => {
  const { summary, description, location, dt_start, dt_end } = event;

  const startDate = useMemo(() => new Date(dt_start), [dt_start]);
  const endDate = useMemo(() => new Date(dt_end), [dt_end]);

  const [timeToEvent, setTimeToEvent] = useState(
    formatDistanceToNow(new Date(dt_start), { includeSeconds: true }),
  );

  useEffect(() => {
    setTimeToEvent(formatDistanceToNow(startDate));
  }, [startDate]);

  return (
    <Box
      minH="36"
      bg="bg-surface"
      boxShadow={useColorModeValue('sm', 'sm-dark')}
      borderRadius="lg"
      px="4"
      py="2"
    >
      <Stack spacing="2">
        <Text fontSize="lg" fontWeight="semibold">
          {summary}
        </Text>
        <Text fontSize="md">{description}</Text>

        <Divider />

        <Text fontSize="sm" fontWeight="light">
          {location}
        </Text>
        <Text>{`Time till event: ${timeToEvent}`}</Text>
        <Text>{`From ${dateFormatter(startDate)}`}</Text>
        <Text>{`To ${dateFormatter(endDate)}`}</Text>
      </Stack>
    </Box>
  );
};

const Events = () => {
  const [offset] = useState(0);
  const { data } = useSWR(`${eventsUrlBuilder()}?limit=12&offset=${offset}`);

  // used to generate loading animation
  const loadingArray = new Array(12).fill(0).map((_x, idx) => idx);

  const colorMode = useColorModeValue('sm', 'sm-dark');

  if (!data) {
    return (
      <SimpleGrid columns={{ base: 1, md: 3 }} gap="6">
        {loadingArray.map((i) => (
          <Skeleton>
            <Box
              key={i}
              minH="36"
              bg="bg-surface"
              boxShadow={colorMode}
              borderRadius="lg"
              px="4"
              py="2"
            />
          </Skeleton>
        ))}
      </SimpleGrid>
    );
  }

  const { results } = data;

  return (
    <SimpleGrid columns={{ base: 1, md: 3 }} gap="6">
      {results.map((e: EventT) => (
        <EventCard event={e} />
      ))}
    </SimpleGrid>
  );
};

export default Events;
