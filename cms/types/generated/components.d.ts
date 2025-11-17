import type { Schema, Struct } from '@strapi/strapi';

export interface WorkoutWorkoutExercise extends Struct.ComponentSchema {
  collectionName: 'components_workout_workout_exercises';
  info: {
    displayName: 'Workout Exercise';
  };
  attributes: {
    exercise: Schema.Attribute.Relation<'oneToOne', 'api::exercise.exercise'>;
    reps: Schema.Attribute.Integer;
    sets: Schema.Attribute.Integer;
    weight: Schema.Attribute.Integer;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'workout.workout-exercise': WorkoutWorkoutExercise;
    }
  }
}
