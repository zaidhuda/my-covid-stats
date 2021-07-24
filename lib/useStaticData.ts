import { useEffect, useState } from 'react';
import { useQuery } from 'react-query'
import { staticData } from '../lib/api'
import csv from 'csvtojson';

const hook = () => {
  const {isLoading: populationLoading, data: {data: populationRawData} = {}} = useQuery('population', staticData.population);

  const [populationData, setPopulationData] = useState();

  useEffect(() => {
    if (!populationLoading && populationRawData) {
      csv().fromString(populationRawData).then(setPopulationData);
    }
  }, [populationLoading])

  return {
    populationLoading, populationData,
  }
}

export default hook;
