import { useEffect, useState } from 'react';
import { useQuery } from 'react-query'
import { epidemic } from './api'
import csv from 'csvtojson';

const hook = () => {
  const {isLoading: casesMalaysiaLoading, data: {data: casesMalaysiaRawData} = {}} = useQuery('casesMalaysia', epidemic.casesMalaysia);
  const {isLoading: casesStateLoading, data: {data: casesStateRawData} = {}} = useQuery('casesState', epidemic.casesState);
  const {isLoading: clustersLoading, data: {data: clustersRawData} = {}} = useQuery('clusters', epidemic.clusters);
  const {isLoading: deathsMalaysiaLoading, data: {data: deathsMalaysiaRawData} = {}} = useQuery('deathsMalaysia', epidemic.deathsMalaysia);
  const {isLoading: deathsStateLoading, data: {data: deathsStateRawData} = {}} = useQuery('deathsState', epidemic.deathsState);
  const {isLoading: hospitalLoading, data: {data: hospitalRawData} = {}} = useQuery('hospital', epidemic.hospital);
  const {isLoading: icuLoading, data: {data: icuRawData} = {}} = useQuery('icu', epidemic.icu);
  const {isLoading: pkrcLoading, data: {data: pkrcRawData} = {}} = useQuery('pkrc', epidemic.pkrc);
  const {isLoading: testsMalaysiaLoading, data: {data: testsMalaysiaRawData} = {}} = useQuery('testsMalaysia', epidemic.testsMalaysia);

  const [casesMalaysiaData, setCasesMalaysiaData] = useState();
  const [casesStateData, setCasesStateData] = useState();
  const [clustersData, setClustersData] = useState();
  const [deathsMalaysiaData, setDeathsMalaysiaData] = useState();
  const [deathsStateData, setDeathsStateData] = useState();
  const [hospitalData, setHospitalData] = useState();
  const [icuData, setIcuData] = useState();
  const [pkrcData, setPkrcData] = useState();
  const [testsMalaysiaData, setTestsMalaysiaData] = useState();

  useEffect(() => {
    if (!casesMalaysiaLoading && casesMalaysiaRawData) {
      csv().fromString(casesMalaysiaRawData).then(setCasesMalaysiaData);
    }
  }, [casesMalaysiaLoading])

  useEffect(() => {
    if (!casesStateLoading && casesStateRawData) {
      csv().fromString(casesStateRawData).then(setCasesStateData);
    }
  }, [casesStateLoading])

  useEffect(() => {
    if (!clustersLoading && clustersRawData) {
      csv().fromString(clustersRawData).then(setClustersData);
    }
  }, [clustersLoading])

  useEffect(() => {
    if (!deathsMalaysiaLoading && deathsMalaysiaRawData) {
      csv().fromString(deathsMalaysiaRawData).then(setDeathsMalaysiaData);
    }
  }, [deathsMalaysiaLoading])

  useEffect(() => {
    if (!deathsStateLoading && deathsStateRawData) {
      csv().fromString(deathsStateRawData).then(setDeathsStateData);
    }
  }, [deathsStateLoading])

  useEffect(() => {
    if (!hospitalLoading && hospitalRawData) {
      csv().fromString(hospitalRawData).then(setHospitalData);
    }
  }, [hospitalLoading])

  useEffect(() => {
    if (!icuLoading && icuRawData) {
      csv().fromString(icuRawData).then(setIcuData);
    }
  }, [icuLoading])

  useEffect(() => {
    if (!pkrcLoading && pkrcRawData) {
      csv().fromString(pkrcRawData).then(setPkrcData);
    }
  }, [pkrcLoading])

  useEffect(() => {
    if (!testsMalaysiaLoading && testsMalaysiaRawData) {
      csv().fromString(testsMalaysiaRawData).then(setTestsMalaysiaData);
    }
  }, [testsMalaysiaLoading])

  return {
    casesMalaysiaLoading, casesMalaysiaData,
    casesStateLoading, casesStateData,
    clustersLoading, clustersData,
    deathsMalaysiaLoading, deathsMalaysiaData,
    deathsStateLoading, deathsStateData,
    hospitalLoading, hospitalData,
    icuLoading, icuData,
    pkrcLoading, pkrcData,
    testsMalaysiaLoading, testsMalaysiaData,
  }
}

export default hook;
