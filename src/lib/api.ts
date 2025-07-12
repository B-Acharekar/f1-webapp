import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8000/api", // change if deployed
});

export const fetchLapTimes = (params: {
  driver: string;
  year: number;
  gp: string;
  session_type: string;
}) => API.get("/lap-times", { params });

export const fetchDriversInSession = (params: {
  year: number;
  gp: string;
  session_type: string;
}) => API.get("/drivers-in-session", { params });

export const fetchSessionSummary = (params: {
  year: number;
  gp: string;
  session_type: string;
}) => API.get("/session-summary", { params });

export const fetchCompareLaps = (params: {
  driver1: string;
  driver2: string;
  lap: number;
  year: number;
  gp: string;
  session_type: string;
}) => API.get("/compare-laps", { params });
