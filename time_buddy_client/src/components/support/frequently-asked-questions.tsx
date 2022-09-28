import { Stack, Text, Divider, Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon } from '@chakra-ui/react';
import useSWR from 'swr';

type FAQType = {
  id: number;
  question: string;
  answer: string;
};

type QuestionAnswerProps = {
  qa: FAQType;
};

const QuestionAnswer = (props: QuestionAnswerProps) => {
  const { qa } = props;
  const { question, answer } = qa;

  return (
      <AccordionItem>
        <AccordionButton>
<Text
        fontSize="md"
        fontWeight="medium"
      >{question}</Text>
      <AccordionIcon />
        </AccordionButton>
   <AccordionPanel>
      <Text fontSize="sm">{answer}</Text>
    </AccordionPanel> 
      </AccordionItem>
  
  );
};

const FrequentlyAskedQuestions = () => {
  const { data } = useSWR('http://localhost:8000/support/question-answer');

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

  const { results } = data;

  return (
    <Accordion>
{results.map((dataT: FAQType) => (
        <QuestionAnswer key={results.id} qa={dataT} />
      ))}
    </Accordion>
      
  );
};

export default FrequentlyAskedQuestions;