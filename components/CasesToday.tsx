import { Box, Heading } from '@chakra-ui/react'
import React from 'react'
import Choropleth from './Choropleth'
import useEpidemicData from '../lib/useEpidemicData';

const CasesToday = () => {
  const {
    casesMalaysiaLoading,
    casesMalaysiaData,
    casesStateLoading,
    casesStateData,
    clustersLoading,
    clustersData,
    deathsMalaysiaLoading,
    deathsMalaysiaData,
    deathsStateLoading,
    deathsStateData,
    hospitalLoading,
    hospitalData,
    icuLoading,
    icuData,
    pkrcLoading,
    pkrcData,
    testsMalaysiaLoading,
    testsMalaysiaData,
  } = useEpidemicData();

  const currentDate = new Date();

  if (casesMalaysiaLoading) return <p>Loading</p>
  return (
    <Box>
      <Choropleth data={casesStateData} loading={casesStateLoading} />
      <Heading size="lg" align="center">
        Today, {currentDate.toDateString()}:
      </Heading>
      <Heading size="4xl" align="center">
        {casesMalaysiaData[casesMalaysiaData.length - 1]?.cases_new} new cases
      </Heading>
    </Box>
  )
}

export default CasesToday
