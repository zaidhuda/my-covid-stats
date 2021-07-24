import { useEffect, useState } from 'react';
import { useQuery } from 'react-query'
import { mysj } from '../lib/api'
import converter from './converter';

const useHook = () => {
  const {
    isLoading: checkinMalaysiaLoading,
    data: { data: checkinMalaysiaRawData } = {},
  } = useQuery('checkinMalaysia', mysj.checkinMalaysia);
  const {
    isLoading: checkinMalaysiaTimeLoading,
    data: { data: checkinMalaysiaTimeRawData } = {},
  } = useQuery('checkinMalaysiaTime', mysj.checkinMalaysiaTime);
  const {
    isLoading: traceMalaysiaLoading,
    data: { data: traceMalaysiaRawData } = {},
  } = useQuery('traceMalaysia', mysj.traceMalaysia);

  const [checkinMalaysiaData, setCheckinMalaysiaData] = useState<{}[]>();
  const [checkinMalaysiaTimeData, setCheckinMalaysiaTimeData] =
    useState<{}[]>();
  const [traceMalaysiaData, setTraceMalaysiaData] = useState<{}[]>();

  useEffect(() => {
    if (!checkinMalaysiaLoading && checkinMalaysiaRawData) {
      converter(setCheckinMalaysiaData, checkinMalaysiaRawData);
    }
  }, [checkinMalaysiaLoading, checkinMalaysiaRawData]);

  useEffect(() => {
    if (!checkinMalaysiaTimeLoading && checkinMalaysiaTimeRawData) {
      converter(setCheckinMalaysiaTimeData, checkinMalaysiaTimeRawData);
    }
  }, [checkinMalaysiaTimeLoading, checkinMalaysiaTimeRawData]);

  useEffect(() => {
    if (!traceMalaysiaLoading && traceMalaysiaRawData) {
      converter(setTraceMalaysiaData, traceMalaysiaRawData);
    }
  }, [traceMalaysiaLoading, traceMalaysiaRawData]);

  return {
    checkinMalaysiaLoading,
    checkinMalaysiaData,
    checkinMalaysiaTimeLoading,
    checkinMalaysiaTimeData,
    traceMalaysiaLoading,
    traceMalaysiaData,
  };
};

export default useHook;
