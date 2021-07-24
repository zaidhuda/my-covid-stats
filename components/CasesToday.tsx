import { Box, Heading } from '@chakra-ui/react'
import React from 'react'
import sortBy from 'lodash/sortBy';
import Choropleth from './Choropleth';
import useEpidemicData from '../lib/useEpidemicData';

const CasesToday = () => {
  const {
    casesMalaysiaLoading,
    casesMalaysiaData,
    casesStateLoading,
    casesStateData,
  } = useEpidemicData();

  if (casesMalaysiaLoading) return <p>Loading</p>;

  const latestRecord = sortBy(casesMalaysiaData, 'date').reverse()[0];

  const latestDate = new Date(latestRecord?.date) || new Date();

  return (
    <Box>
      <Choropleth data={casesStateData} loading={casesStateLoading} />
      <Heading size="lg" align="center">
        Updated, {latestDate.toDateString()}:
      </Heading>
      <Heading size="4xl" align="center">
        {latestRecord?.cases_new || 'Waiting report for'} new cases
      </Heading>
    </Box>
  );
};

export default CasesToday
