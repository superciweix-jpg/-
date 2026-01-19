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
  restTime?: string; // Suggested rest time in seconds (e.g., "120-180")
  isRest?: boolean;
  formCheck?: string[]; // Smart Form-Check instructions
}

export interface DailyPlan {
  dayName: string;
  focus: string;
  warning?: string;
  warmup?: Exercise[]; // New Warmup Section
  exercises: Exercise[];
  cooldown?: Exercise[]; // New Cooldown Section
  coachNote: string;
  theme: 'strength' | 'cardio' | 'rest' | 'skill' | 'zen';
}

export interface WeeklySchedule {
  [key: number]: DailyPlan;
}

export interface WorkoutLog {
  [date: string]: {
    completed: boolean;
    duration?: string; // Minutes
    calories?: string; // KCAL
    exercises: {
      [exerciseId: string]: {
        done: boolean;
        weight: string;
        reps: string; // Added actual reps logging
      };
    };
  };
}

export interface HistoryRecord {
  id: string;
  date: string; // YYYY-MM-DD
  dayName: string; // e.g., "星期一"
  title: string; // e.g., "上肢肌肥大"
  duration: string;
  calories: string;
  completedAt: number; // Timestamp for sorting
}