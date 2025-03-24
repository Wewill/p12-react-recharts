export type userData = {
  data: {
    id: number;
    userInfos: {
      firstName: string;
      lastName: string;
      age: number;
    };
    todayScore: number;
    keyData: {
      calorieCount: number;
      proteinCount: number;
      carbohydrateCount: number;
      lipidCount: number;
    };
  };
};

export type activityData = {
  data: {
    userId: number;
    sessions: {
      day: string;
      kilogram: number;
      calories: number;
    }[];
  };
};

export type sessionsData = {
  data: {
    userId: number;
    sessions: {
      day: number;
      sessionLength: number;
    }[];
  };
};

export type performanceData = {
  data: {
    userId: number;
    kind?: [key: number];
    data: {
      value: number;
      kind: number;
    }[];
  };
};
