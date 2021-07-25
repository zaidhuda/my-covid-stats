import { Box } from '@chakra-ui/react';
import React from 'react';
import StackedBarChart from './StackedBarChart';

interface Props {
  casesState: any;
}

const Trend = ({ casesState }: Props) => {
  return (
    <Box>
      <StackedBarChart data={casesState} />
    </Box>
  );
};

export default Trend;
