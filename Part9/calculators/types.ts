export interface BmiParams {
  height: number;
  weight: number;
}

export interface ExerciseParams {
  targetHours: number;
  dailyHours: Array<number>;
}

export interface ExerciseResult {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: 1 | 2 | 3;
  ratingDescription: string;
  target: number;
  average: number;
}

export interface ErrorMessage {
  error: string;
}
