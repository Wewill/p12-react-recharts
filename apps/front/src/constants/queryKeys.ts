const queryKeys = {
  USER: (id: number) => ["user", id] as const,
  ACTIVITY: "activity",
  SESSION: "average-sessions",
  PERFORMANCE: "performance",
} as const;

export default queryKeys;
