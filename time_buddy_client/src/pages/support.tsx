import { Stack, Heading, Text, Divider } from '@chakra-ui/react';
import useSWR from 'swr';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://othscwzdrhpeueyhvlpq.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im90aHNjd3pkcmhwZXVleWh2bHBxIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjIzMDM4OTUsImV4cCI6MTk3Nzg3OTg5NX0.BysQ25yYAady3RfYg_NloFw2cozewqzTPawP8SCM56k';
const supabase = createClient(supabaseUrl, supabaseKey);

const faqFetcher = async (range: string) => {
  // const { data, error } = await supabase.from('support_faq').select('*');
  const { data: support_faq, error } = await supabase
    .from('support_faq')
    .select('*');

  if (error) {
    // eslint-disable-next-line @typescript-eslint/no-throw-literal
    throw error;
  }

  console.log(support_faq);
  return support_faq;
};

type FaqType = {
  id: number;
  createdAt: number;
  question: string;
  answer: string;
};

type QuestionAnswerProps = {
  qa: FaqType;
};

const QuestionAnswer = (props: QuestionAnswerProps) => {
  const { qa } = props;

  return (
    <>
      <Text
        fontSize="md"
        fontWeight="medium"
      >{`Question: ${qa.question}`}</Text>
      <Text fontSize="sm">{`Answer: ${qa.answer}`}</Text>
    </>
  );
};

const FrequentlyAskedQuestions = () => {
  const { data } = useSWR('*', faqFetcher);

  const fakeData: FaqType[] = [
    {
      id: 1,
      createdAt: Date.now(),
      question: 'First Question!',
      answer: 'first answer!',
    },
  ];
  console.log(data);
  return (
    <Stack spacing="5" mb="8">
      <Text fontSize="lg" fontWeight="medium">
        Frequently Asked Questions
      </Text>
      <Divider />
      {fakeData.map((dataT: FaqType) => (
        <QuestionAnswer qa={dataT} />
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
