import { Stack, Box, Heading, Text, Divider } from '@chakra-ui/react';
import useSWR, { Fetcher } from 'swr';
import { createClient } from '@supabase/supabase-js';

import { supabaseKey, supabaseUrl } from '../constants/supabase';

const supabase = createClient(supabaseUrl, supabaseKey);

const fetchAll: Fetcher<FaqType[], string> = async (table: string) => {
  const { data: supportFaq, error } = await supabase.from(table).select('*');

  if (error) {
    // eslint-disable-next-line @typescript-eslint/no-throw-literal
    throw error;
  }

  return supportFaq;
};

type FaqType = {
  id: number;
  created_at: string;
  question: string;
  answer: string;
};

type QuestionAnswerProps = {
  qa: FaqType;
};

const QuestionAnswer = (props: QuestionAnswerProps) => {
  const { qa } = props;

  return (
    <Box>
      <Text
        fontSize="md"
        fontWeight="medium"
      >{`Question: ${qa.question}`}</Text>
      <Text fontSize="sm">{`Answer: ${qa.answer}`}</Text>
    </Box>
  );
};

const FrequentlyAskedQuestions = () => {
  const { data } = useSWR('support_faq', fetchAll);

  if (!data) {
    return (
      <Stack spacing="5" mb="8">
        <Text fontSize="lg" fontWeight="medium">
          Frequently Asked Questions
        </Text>
        <Divider />
      </Stack>
    );
  }

  return (
    <Stack spacing="5" mb="8">
      <Text fontSize="lg" fontWeight="medium">
        Frequently Asked Questions
      </Text>
      <Divider />
      {data.map((dataT: FaqType) => (
        <QuestionAnswer key={dataT.id} qa={dataT} />
      ))}
    </Stack>
  );
};

const Support = () => (
  <>
    <Heading size="md" mb="8">
      Time Buddy Support
    </Heading>
    <FrequentlyAskedQuestions />
    <Stack spacing="5">
      <Text fontSize="lg" fontWeight="medium">
        Have a problem? Contact us
      </Text>
      <Divider />
      <Text>Coming soon...</Text>
    </Stack>
  </>
);

export default Support;
