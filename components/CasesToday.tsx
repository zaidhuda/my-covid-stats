import { Box, Heading } from '@chakra-ui/react';
import React from 'react';
import sortBy from 'lodash/sortBy';
import Choropleth from './Choropleth';

interface Props {
  casesState: any;
}

const CasesToday = ({ casesState }: Props) => {
  const latestDate = sortBy(casesState, 'date').reverse()[0].date;
  const latestRecords = casesState.filter(
    ({ date }: { date: string }) => date === latestDate
  );
  const cases = latestRecords.reduce(
    (acc: number, { casesNew }: { casesNew: number }) => acc + casesNew,
    0
  );

  return (
    <Box>
      <Choropleth data={casesState} />
      <Heading size="lg" align="center">
        Updated, {(new Date(latestDate) || new Date()).toDateString()}:
      </Heading>
      <Heading size="4xl" align="center">
        {cases || 'Waiting report for'} new cases
      </Heading>
    </Box>
  );
};

export default CasesToday;
