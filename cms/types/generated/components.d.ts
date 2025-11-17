import type { Schema, Struct } from '@strapi/strapi';

export interface WorkoutWorkoutExercise extends Struct.ComponentSchema {
  collectionName: 'components_workout_workout_exercises';
  info: {
    displayName: 'Workout Exercise';
  };
  attributes: {
    exercise: Schema.Attribute.Relation<'oneToOne', 'api::exercise.exercise'>;
    sets: Schema.Attribute.Component<'workout.workout-set', true>;
  };
}

export interface WorkoutWorkoutSet extends Struct.ComponentSchema {
  collectionName: 'components_workout_workout_sets';
  info: {
    displayName: 'Workout Set';
  };
  attributes: {
    reps: Schema.Attribute.Integer;
    rp: Schema.Attribute.Integer;
    weight: Schema.Attribute.Float;
    weightUnit: Schema.Attribute.Enumeration<['kg', 'lb']> &
      Schema.Attribute.DefaultTo<'kg'>;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'workout.workout-exercise': WorkoutWorkoutExercise;
      'workout.workout-set': WorkoutWorkoutSet;
    }
  }
}
