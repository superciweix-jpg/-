export interface UserProfile {
  name: string;
  stats: {
    height: string;
    weight: string;
    bench: string;
    squat: string;
    deadlift: string;
  };
  injuries: string[];
}

export interface Exercise {
  id: string;
  name: string;
  sets: string;
  reps: string; // The prescribed rep range (e.g. "5-8")
  targetWeight?: string; // The calculated target based on PR
  targetReps?: string; // The specific target rep count
  notes?: string;
  isRest?: boolean;
  formCheck?: string[]; // Smart Form-Check instructions
}

export interface DailyPlan {
  dayName: string;
  focus: string;
  warning?: string;
  exercises: Exercise[];
  coachNote: string;
  theme: 'strength' | 'cardio' | 'rest' | 'skill' | 'zen';
}

export interface WeeklySchedule {
  [key: number]: DailyPlan;
}

export interface WorkoutLog {
  [date: string]: {
    completed: boolean;
    exercises: {
      [exerciseId: string]: {
        done: boolean;
        weight: string;
        reps: string; // Added actual reps logging
      };
    };
  };
}