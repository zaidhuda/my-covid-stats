import { Box } from '@chakra-ui/react';
import React from 'react';
import useEpidemicData from '../lib/useEpidemicData';
import StackedBarChart from './StackedBarChart';

const Trend = () => {
  const { casesStateLoading, casesStateData } = useEpidemicData();

  return (
    <Box>
      <StackedBarChart data={casesStateData} loading={casesStateLoading} />
    </Box>
  );
};

export default Trend;
