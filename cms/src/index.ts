const SAMPLE_EXERCISES = [
  [
    {
      name: "Bench Press",
      description: "Barbell chest exercise.",
      difficulty: "Intermediate",
      muscleGroup: "Chest",
      image: "https://via.placeholder.com/400x300?text=Bench+Press",
      videoUrl: "https://www.youtube.com/watch?v=gRVjAtPip0Y",
      isActive: true,
    },
    {
      name: "Barbell Row",
      description: "Horizontal row for lats.",
      difficulty: "Intermediate",
      muscleGroup: "Back",
      image: "https://via.placeholder.com/400x300?text=Barbell+Row",
      videoUrl: "https://www.youtube.com/watch?v=gRVjAtPip0Y",
      isActive: true,
    },
    {
      name: "Front Squat",
      description: "Squat with the barbell in front of the body.",
      difficulty: "Intermediate",
      muscleGroup: "Legs",
      image: "https://via.placeholder.com/400x300?text=Front+Squat",
      videoUrl: "https://www.youtube.com/watch?v=gRVjAtPip0Y",
      isActive: true,
    },
    {
      name: "Lateral Raises",
      description: "Isometric work for the middle deltoid.",
      difficulty: "Beginner",
      muscleGroup: "Shoulders",
      image: "https://via.placeholder.com/400x300?text=Lateral+Raises",
      videoUrl: "https://www.youtube.com/watch?v=gRVjAtPip0Y",
      isActive: true,
    },
    {
      name: "Romanian Deadlift",
      description: "Hamstrings and lower-back exercise.",
      difficulty: "Advanced",
      muscleGroup: "Back",
      image: "https://via.placeholder.com/400x300?text=Romanian+Deadlift",
      videoUrl: "https://www.youtube.com/watch?v=gRVjAtPip0Y",
      isActive: true,
    },
    {
      name: "Dumbbell Curl",
      description: "Unilateral biceps curl.",
      difficulty: "Beginner",
      muscleGroup: "Arms",
      image: "https://via.placeholder.com/400x300?text=Dumbbell+Curl",
      videoUrl: "https://www.youtube.com/watch?v=gRVjAtPip0Y",
      isActive: true,
    },
    {
      name: "Dips",
      description: "Dips for chest and triceps.",
      difficulty: "Advanced",
      muscleGroup: "Chest",
      image: "https://via.placeholder.com/400x300?text=Dips",
      videoUrl: "https://www.youtube.com/watch?v=gRVjAtPip0Y",
      isActive: true,
    },
    {
      name: "Front Plank",
      description: "Isometric core exercise.",
      difficulty: "Beginner",
      muscleGroup: "Core",
      image: "https://via.placeholder.com/400x300?text=Front+Plank",
      videoUrl: "https://www.youtube.com/watch?v=gRVjAtPip0Y",
      isActive: true,
    },
    {
      name: "Plyometric Jumps",
      description: "Leg power and explosiveness training.",
      difficulty: "Advanced",
      muscleGroup: "Legs",
      image: "https://via.placeholder.com/400x300?text=Plyometric+Jumps",
      videoUrl: "https://www.youtube.com/watch?v=gRVjAtPip0Y",
      isActive: true,
    },
    {
      name: "Pull-over",
      description: "Stretching exercise for chest and lats.",
      difficulty: "Intermediate",
      muscleGroup: "Back",
      image: "https://via.placeholder.com/400x300?text=Pull-over",
      videoUrl: "https://www.youtube.com/watch?v=gRVjAtPip0Y",
      isActive: true,
    },
    {
      name: "Seated Military Press",
      description: "Dumbbell shoulder press.",
      difficulty: "Intermediate",
      muscleGroup: "Shoulders",
      image: "https://via.placeholder.com/400x300?text=Seated+Military+Press",
      videoUrl: "https://www.youtube.com/watch?v=gRVjAtPip0Y",
      isActive: true,
    },
  ],
];

export default {
  register() {},

  async bootstrap({ strapi }: { strapi: any }) {
    const exerciseQuery = strapi.db.query("api::exercise.exercise");
    const existingExercises = await exerciseQuery.findMany({ select: ["name"] });
    const existingNames = new Set(existingExercises.map((item) => item.name));

    for (const routine of SAMPLE_EXERCISES) {
      for (const exercise of routine) {
        if (!existingNames.has(exercise.name)) {
          // ⚠️ Evitamos romper la relación de media: `image` es un campo de tipo media en Strapi
          const { image, ...exerciseData } = exercise;

          await exerciseQuery.create({
            data: {
              ...exerciseData,
              isActive: true,
            },
          });
        }
      }
    }
  },

  async destroy() {},
};