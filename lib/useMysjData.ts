import { useEffect, useState } from 'react';
import { useQuery } from 'react-query'
import { mysj } from '../lib/api'
import csv from 'csvtojson';

const hook = () => {
  const {isLoading: checkinMalaysiaLoading, data: {data: checkinMalaysiaRawData} = {}} = useQuery('checkinMalaysia', mysj.checkinMalaysia);
  const {isLoading: checkinMalaysiaTimeLoading, data: {data: checkinMalaysiaTimeRawData} = {}} = useQuery('checkinMalaysiaTime', mysj.checkinMalaysiaTime);
  const {isLoading: traceMalaysiaLoading, data: {data: traceMalaysiaRawData} = {}} = useQuery('traceMalaysia', mysj.traceMalaysia);

  const [checkinMalaysiaData, setCheckinMalaysiaData] = useState();
  const [checkinMalaysiaTimeData, setCheckinMalaysiaTimeData] = useState();
  const [traceMalaysiaData, setTraceMalaysiaData] = useState();

  useEffect(() => {
    if (!checkinMalaysiaLoading && checkinMalaysiaRawData) {
      csv().fromString(checkinMalaysiaRawData).then(setCheckinMalaysiaData);
    }
  }, [checkinMalaysiaLoading])

  useEffect(() => {
    if (!checkinMalaysiaTimeLoading && checkinMalaysiaTimeRawData) {
      csv().fromString(checkinMalaysiaTimeRawData).then(setCheckinMalaysiaTimeData);
    }
  }, [checkinMalaysiaTimeLoading])

  useEffect(() => {
    if (!traceMalaysiaLoading && traceMalaysiaRawData) {
      csv().fromString(traceMalaysiaRawData).then(setTraceMalaysiaData);
    }
  }, [traceMalaysiaLoading])

  return {
    checkinMalaysiaLoading, checkinMalaysiaData,
    checkinMalaysiaTimeLoading, checkinMalaysiaTimeData,
    traceMalaysiaLoading, traceMalaysiaData,
  }
}

export default hook;
