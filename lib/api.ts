import Axios from 'axios';

const api = Axios.create({
  baseURL: 'https://raw.githubusercontent.com/MoH-Malaysia/covid19-public/main'
});

export const epidemic = {
  casesMalaysia: () => api.get('/epidemic/cases_malaysia.csv'),
  casesState: () => api.get('/epidemic/cases_state.csv'),
  clusters: () => api.get('/epidemic/clusters.csv'),
  deathsMalaysia: () => api.get('/epidemic/deaths_malaysia.csv'),
  deathsState: () => api.get('/epidemic/deaths_state.csv'),
  hospital: () => api.get('/epidemic/hospital.csv'),
  icu: () => api.get('/epidemic/icu.csv'),
  pkrc: () => api.get('/epidemic/pkrc.csv'),
  testsMalaysia: () => api.get('/epidemic/tests_malaysia.csv'),
}

export const mysj = {
  checkinMalaysia: () => api.get('/mysejahtera/checkin_malaysia.csv'),
  checkinMalaysiaTime: () => api.get('/mysejahtera/checkin_malaysia_time.csv'),
  traceMalaysia: () => api.get('/mysejahtera/trace_malaysia.csv'),
}

export const staticData = {
  population: () => api.get('/static/population.csv'),
}
