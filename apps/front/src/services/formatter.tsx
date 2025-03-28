import {
  //   UserData,
  PerformanceData,
  ActivityData,
  SessionsData,
} from "../types/data";

const kindLabels: { [key: number]: string } = {
  1: "Cardio",
  2: "Energie",
  3: "Endurance",
  4: "Force",
  5: "Vitesse",
  6: "Intensité",
};

const getDayName = (dayNumber: number): string => {
  const days = ["L", "M", "M", "J", "V", "S", "D"];
  return days[dayNumber];
};
class Formatter {
  static formatActivity(data: ActivityData) {
    return data.data.sessions.map((session) => ({
      name: new Date(session.day).getDate().toString(),
      pv: session.kilogram,
      uv: session.calories,
    }));
  }

  static formatPerformance(data: PerformanceData) {
    return Object.keys(data.data.data).map((key: string) => ({
      subject: kindLabels[data.data.data[Number(key)]?.kind],
      grade: data.data.data[Number(key)]?.value,
      fullMark: 250,
    }));
  }

  static formatSessions(data: SessionsData) {
    return Object.keys(data.data.sessions).map((key: string) => ({
      name: getDayName(data.data.sessions[Number(key)]?.day - 1),
      pv: data.data.sessions[Number(key)]?.sessionLength,
    }));
  }
}

export default Formatter;
