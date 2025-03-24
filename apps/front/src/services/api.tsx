import {
  userData,
  performanceData,
  activityData,
  sessionsData,
} from "../types/data";

/*
http://localhost:3000/user/${userId} - retrieves information from a user. This first endpoint includes the user id, user information (first name, last name and age), the current day's score (todayScore) and key data (calorie, macronutrient, etc.).
http://localhost:3000/user/${userId}/activity - retrieves a user's activity day by day with kilograms and calories.
http://localhost:3000/user/${userId}/average-sessions - retrieves the average sessions of a user per day. The week starts on Monday.
http://localhost:3000/user/${userId}/performance - retrieves a user's performance (energy, endurance, etc.).
*/

export const fetchUser = async (userId: number): Promise<userData> => {
  const response = await fetch("http://localhost:3000/user/" + userId);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return await response.json();
};

export const fetchActivity = async (userId: number): Promise<activityData> => {
  const response = await fetch(
    "http://localhost:3000/user/" + userId + "/activity"
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return await response.json();
};

export const fetchSessions = async (userId: number): Promise<sessionsData> => {
  const response = await fetch(
    "http://localhost:3000/user/" + userId + "/average-sessions"
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return await response.json();
};

export const fetchPerformance = async (
  userId: number
): Promise<performanceData> => {
  const response = await fetch(
    "http://localhost:3000/user/" + userId + "/performance"
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return await response.json();
};
