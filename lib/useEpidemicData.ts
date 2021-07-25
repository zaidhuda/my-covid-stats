import { useEffect, useState } from 'react';
import { useQuery } from 'react-query'
import { epidemic } from './api'
import converter from './converter';

export interface CaseMalaysia {
  date: string;
  casesNew: number;
}

export interface CaseState {
  date: string;
  state: string;
  casesNew: number;
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
  // const { isLoading: clustersLoading, data: { data: clustersRawData } = {} } =
  //   useQuery('clusters', epidemic.clusters);
  // const {
  //   isLoading: deathsMalaysiaLoading,
  //   data: { data: deathsMalaysiaRawData } = {},
  // } = useQuery('deathsMalaysia', epidemic.deathsMalaysia);
  // const {
  //   isLoading: deathsStateLoading,
  //   data: { data: deathsStateRawData } = {},
  // } = useQuery('deathsState', epidemic.deathsState);
  // const { isLoading: hospitalLoading, data: { data: hospitalRawData } = {} } =
  //   useQuery('hospital', epidemic.hospital);
  // const { isLoading: icuLoading, data: { data: icuRawData } = {} } = useQuery(
  //   'icu',
  //   epidemic.icu
  // );
  // const { isLoading: pkrcLoading, data: { data: pkrcRawData } = {} } = useQuery(
  //   'pkrc',
  //   epidemic.pkrc
  // );
  // const {
  //   isLoading: testsMalaysiaLoading,
  //   data: { data: testsMalaysiaRawData } = {},
  // } = useQuery('testsMalaysia', epidemic.testsMalaysia);

  const [casesMalaysiaData, setCasesMalaysiaData] = useState<CaseMalaysia[]>(
    []
  );
  const [casesStateData, setCasesStateData] = useState<CaseState[]>([]);
  // const [clustersData, setClustersData] = useState<{}[]>();
  // const [deathsMalaysiaData, setDeathsMalaysiaData] = useState<{}[]>();
  // const [deathsStateData, setDeathsStateData] = useState<{}[]>();
  // const [hospitalData, setHospitalData] = useState<{}[]>();
  // const [icuData, setIcuData] = useState<{}[]>();
  // const [pkrcData, setPkrcData] = useState<{}[]>();
  // const [testsMalaysiaData, setTestsMalaysiaData] = useState<{}[]>();

  useEffect(() => {
    if (!casesMalaysiaLoading && casesMalaysiaRawData) {
      converter(setCasesMalaysiaData, casesMalaysiaRawData);
    }
  }, [casesMalaysiaLoading, casesMalaysiaRawData]);

  useEffect(() => {
    if (!casesStateLoading && casesStateRawData) {
      converter(setCasesStateData, casesStateRawData);
    }
  }, [casesStateLoading, casesStateRawData]);

  // useEffect(() => {
  //   if (!clustersLoading && clustersRawData) {
  //     converter(setClustersData, clustersRawData);
  //   }
  // }, [clustersLoading, clustersRawData]);

  // useEffect(() => {
  //   if (!deathsMalaysiaLoading && deathsMalaysiaRawData) {
  //     converter(setDeathsMalaysiaData, deathsMalaysiaRawData);
  //   }
  // }, [deathsMalaysiaLoading, deathsMalaysiaRawData]);

  // useEffect(() => {
  //   if (!deathsStateLoading && deathsStateRawData) {
  //     converter(setDeathsStateData, deathsStateRawData);
  //   }
  // }, [deathsStateLoading, deathsStateRawData]);

  // useEffect(() => {
  //   if (!hospitalLoading && hospitalRawData) {
  //     converter(setHospitalData, hospitalRawData);
  //   }
  // }, [hospitalLoading, hospitalRawData]);

  // useEffect(() => {
  //   if (!icuLoading && icuRawData) {
  //     converter(setIcuData, icuRawData);
  //   }
  // }, [icuLoading, icuRawData]);

  // useEffect(() => {
  //   if (!pkrcLoading && pkrcRawData) {
  //     converter(setPkrcData, pkrcRawData);
  //   }
  // }, [pkrcLoading, pkrcRawData]);

  // useEffect(() => {
  //   if (!testsMalaysiaLoading && testsMalaysiaRawData) {
  //     converter(setTestsMalaysiaData, testsMalaysiaRawData);
  //   }
  // }, [testsMalaysiaLoading, testsMalaysiaRawData]);

  return {
    casesMalaysiaLoading,
    casesMalaysiaData,
    casesStateLoading,
    casesStateData,
    // clustersLoading,
    // clustersData,
    // deathsMalaysiaLoading,
    // deathsMalaysiaData,
    // deathsStateLoading,
    // deathsStateData,
    // hospitalLoading,
    // hospitalData,
    // icuLoading,
    // icuData,
    // pkrcLoading,
    // pkrcData,
    // testsMalaysiaLoading,
    // testsMalaysiaData,
  };
};

export default useHook;
