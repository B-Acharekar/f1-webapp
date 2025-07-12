import axios from "axios";

const BASE = "http://localhost:8000/api";

export const fetchDriversInSession = (params: any) =>
  axios.get(`${BASE}/session/drivers`, { params });

export const fetchLapTimes = (params: any) =>
  axios.get(`${BASE}/lap-times`, { params });

export const fetchCompareLaps = (params: any) =>
  axios.get(`${BASE}/compare-laps`, { params });

export const fetchSessionSummary = (params: any) =>
  axios.get(`${BASE}/session/summary`, { params });

export const fetchEvents = (year: number) =>
  axios.get(`${BASE}/events`, { params: { year } });

export const fetchNextRace = (year: number) =>
  axios.get(`${BASE}/next-race`, { params: { year } });

export const fetchStories = () =>
  axios.get(`${BASE}/stories`);

export const fetchDrivers = (limit?: number) =>
  axios.get(`${BASE}/drivers`, { params: { limit } });