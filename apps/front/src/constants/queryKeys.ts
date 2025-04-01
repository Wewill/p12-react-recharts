const queryKeys = {
  USER: (id: number) => ["user", id] as const,
  ACTIVITY: (id: number) => ["activity", id] as const,
  SESSION: (id: number) => ["average-sessions", id] as const,
  PERFORMANCE: (id: number) => ["performance", id] as const,
} as const;

export default queryKeys;
