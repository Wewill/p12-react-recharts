// Parametres typescript :
export type ApiData<D> = {
  data: D;
};

export type UserData = ApiData<{
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
}>;

export type ActivityData = ApiData<{
  userId: number;
  sessions: {
    day: string;
    kilogram: number;
    calories: number;
  }[];
}>;

export type SessionsData = ApiData<{
  userId: number;
  sessions: {
    day: number;
    sessionLength: number;
  }[];
}>;

export type PerformanceData = ApiData<{
  userId: number;
  kind?: [key: number];
  data: {
    value: number;
    kind: number;
  }[];
}>;
