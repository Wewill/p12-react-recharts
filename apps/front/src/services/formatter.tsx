import {
  UserData,
  PerformanceData,
  ActivityData,
  SessionsData,
} from "../types/data";

class Formatter {
  static formatActivity(data: ActivityData) {
    return data.data.sessions.map((session) => ({
      name: new Date(session.day).getDate().toString(),
      pv: session.kilogram,
      uv: session.calories,
    }));
  }

  static formatPerformance(data: PerformanceData) {
    return data.data.map((performance) => ({
      name: performance.kind,
      value: performance.value,
    }));
  }

  static formatSessions(data: SessionsData) {
    return data.data.sessions.map((session) => ({
      name: new Date(session.day).getDate().toString(),
      uv: session.sessionLength,
    }));
  }
}

export default Formatter;
