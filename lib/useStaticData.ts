import { useEffect, useState } from 'react';
import { useQuery } from 'react-query'
import { staticData } from '../lib/api'
import csv from 'csvtojson';

const useHook = () => {
  const {
    isLoading: populationLoading,
    data: { data: populationRawData } = {},
  } = useQuery('population', staticData.population);

  const [populationData, setPopulationData] = useState<{}[]>();

  useEffect(() => {
    if (!populationLoading && populationRawData) {
      csv().fromString(populationRawData).then(setPopulationData);
    }
  }, [populationLoading, populationRawData]);

  return {
    populationLoading,
    populationData,
  };
};

export default useHook;
