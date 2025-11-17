export const formatWorkoutDate = (date?: Date) =>
  date?.toLocaleDateString("es-ES", { weekday: "short", day: "numeric", month: "short" }) ??
  "Fecha desconocida";

export const formatWorkoutDuration = (seconds: number) => {
  if (!seconds) return "0 min";
  const minutes = Math.floor(seconds / 60);
  const remainder = seconds % 60;
  return remainder ? `${minutes}m ${remainder}s` : `${minutes}m`;
};

