import {
  Text,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  SkeletonText,
} from '@chakra-ui/react';
import useSWR from 'swr';

import { QUESTION_ANSWER_URL } from '../../constants/api';

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
        <Text fontSize="md" fontWeight="medium">
          {question}
        </Text>
        <AccordionIcon />
      </AccordionButton>
      <AccordionPanel>
        <Text fontSize="sm">{answer}</Text>
      </AccordionPanel>
    </AccordionItem>
  );
};

const FrequentlyAskedQuestions = () => {
  const { data } = useSWR(QUESTION_ANSWER_URL);

  if (!data) {
    return <SkeletonText noOfLines={4} />;
  }

  const { results } = data;

  return (
    <Accordion>
      {results.map((dataT: FAQType) => (
        <QuestionAnswer key={dataT.id} qa={dataT} />
      ))}
    </Accordion>
  );
};

export default FrequentlyAskedQuestions;
