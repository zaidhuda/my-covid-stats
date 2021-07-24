import { useEffect, useState } from 'react';
import { useQuery } from 'react-query'
import { epidemic } from './api'
import csv from 'csvtojson';

export interface CaseMalaysia {
  date: string;
  cases_new: number;
}

export interface CaseState {
  date: string;
  state: string;
  cases_new: number;
}

const useHook = () => {
  const {
    isLoading: casesMalaysiaLoading,
    data: { data: casesMalaysiaRawData } = {},
  } = useQuery('casesMalaysia', epidemic.casesMalaysia);
  const {
    isLoading: casesStateLoading,
    data: { data: casesStateRawData } = {},
  } = useQuery('casesState', epidemic.casesState);
  const { isLoading: clustersLoading, data: { data: clustersRawData } = {} } =
    useQuery('clusters', epidemic.clusters);
  const {
    isLoading: deathsMalaysiaLoading,
    data: { data: deathsMalaysiaRawData } = {},
  } = useQuery('deathsMalaysia', epidemic.deathsMalaysia);
  const {
    isLoading: deathsStateLoading,
    data: { data: deathsStateRawData } = {},
  } = useQuery('deathsState', epidemic.deathsState);
  const { isLoading: hospitalLoading, data: { data: hospitalRawData } = {} } =
    useQuery('hospital', epidemic.hospital);
  const { isLoading: icuLoading, data: { data: icuRawData } = {} } = useQuery(
    'icu',
    epidemic.icu
  );
  const { isLoading: pkrcLoading, data: { data: pkrcRawData } = {} } = useQuery(
    'pkrc',
    epidemic.pkrc
  );
  const {
    isLoading: testsMalaysiaLoading,
    data: { data: testsMalaysiaRawData } = {},
  } = useQuery('testsMalaysia', epidemic.testsMalaysia);

  const [casesMalaysiaData, setCasesMalaysiaData] = useState<CaseMalaysia[]>(
    []
  );
  const [casesStateData, setCasesStateData] = useState<CaseState[]>([]);
  const [clustersData, setClustersData] = useState<{}[]>();
  const [deathsMalaysiaData, setDeathsMalaysiaData] = useState<{}[]>();
  const [deathsStateData, setDeathsStateData] = useState<{}[]>();
  const [hospitalData, setHospitalData] = useState<{}[]>();
  const [icuData, setIcuData] = useState<{}[]>();
  const [pkrcData, setPkrcData] = useState<{}[]>();
  const [testsMalaysiaData, setTestsMalaysiaData] = useState<{}[]>();

  useEffect(() => {
    if (!casesMalaysiaLoading && casesMalaysiaRawData) {
      csv().fromString(casesMalaysiaRawData).then(setCasesMalaysiaData);
    }
  }, [casesMalaysiaLoading, casesMalaysiaRawData]);

  useEffect(() => {
    if (!casesStateLoading && casesStateRawData) {
      csv().fromString(casesStateRawData).then(setCasesStateData);
    }
  }, [casesStateLoading, casesStateRawData]);

  useEffect(() => {
    if (!clustersLoading && clustersRawData) {
      csv().fromString(clustersRawData).then(setClustersData);
    }
  }, [clustersLoading, clustersRawData]);

  useEffect(() => {
    if (!deathsMalaysiaLoading && deathsMalaysiaRawData) {
      csv().fromString(deathsMalaysiaRawData).then(setDeathsMalaysiaData);
    }
  }, [deathsMalaysiaLoading, deathsMalaysiaRawData]);

  useEffect(() => {
    if (!deathsStateLoading && deathsStateRawData) {
      csv().fromString(deathsStateRawData).then(setDeathsStateData);
    }
  }, [deathsStateLoading, deathsStateRawData]);

  useEffect(() => {
    if (!hospitalLoading && hospitalRawData) {
      csv().fromString(hospitalRawData).then(setHospitalData);
    }
  }, [hospitalLoading, hospitalRawData]);

  useEffect(() => {
    if (!icuLoading && icuRawData) {
      csv().fromString(icuRawData).then(setIcuData);
    }
  }, [icuLoading, icuRawData]);

  useEffect(() => {
    if (!pkrcLoading && pkrcRawData) {
      csv().fromString(pkrcRawData).then(setPkrcData);
    }
  }, [pkrcLoading, pkrcRawData]);

  useEffect(() => {
    if (!testsMalaysiaLoading && testsMalaysiaRawData) {
      csv().fromString(testsMalaysiaRawData).then(setTestsMalaysiaData);
    }
  }, [testsMalaysiaLoading, testsMalaysiaRawData]);

  return {
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
  };
};

export default useHook;
