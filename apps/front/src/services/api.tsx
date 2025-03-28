import {
  UserData,
  PerformanceData,
  ActivityData,
  SessionsData,
} from "../types/data";

/*
http://localhost:3000/user/${userId} - retrieves information from a user. This first endpoint includes the user id, user information (first name, last name and age), the current day's score (todayScore) and key data (calorie, macronutrient, etc.).
http://localhost:3000/user/${userId}/activity - retrieves a user's activity day by day with kilograms and calories.
http://localhost:3000/user/${userId}/average-sessions - retrieves the average sessions of a user per day. The week starts on Monday.
http://localhost:3000/user/${userId}/performance - retrieves a user's performance (energy, endurance, etc.).
*/

const baseUrl = import.meta.env.VITE_API_URL;

const fetchUser = async (userId: number) => {
  const response = await fetch(`${baseUrl}/user/` + userId);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return (await response.json()) as UserData;
};

const fetchActivity = async (userId: number) => {
  const response = await fetch(`${baseUrl}/user/` + userId + "/activity");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return (await response.json()) as ActivityData;
};

const fetchSessions = async (userId: number) => {
  const response = await fetch(
    `${baseUrl}/user/` + userId + "/average-sessions"
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return (await response.json()) as SessionsData;
};

const fetchPerformance = async (userId: number) => {
  const response = await fetch(`${baseUrl}/user/` + userId + "/performance");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return (await response.json()) as PerformanceData;
};

export { fetchUser, fetchActivity, fetchSessions, fetchPerformance };
