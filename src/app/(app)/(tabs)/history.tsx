import {
  ActivityIndicator,
  Modal,
  RefreshControl,
  SectionList,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useMemo, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useUser } from "@clerk/clerk-expo";
import { Workout } from "@/services/types";
import { useWorkoutHistoryQuery } from "@/services/history/history.hooks";
import { formatWorkoutDuration } from "@/utils/lib/format";
import {
  formatExerciseSummary,
  formatSetDetail,
  getPrimaryWeightUnit,
  getTotalWeightLifted,
  groupWorkoutsByMonth,
} from "@/utils/lib/history";
import { Ionicons } from "@expo/vector-icons";

const WorkoutDetailModal = ({
  workout,
  onClose,
}: {
  workout: Workout | null;
  onClose: () => void;
}) => {
  if (!workout) return null;
  return (
    <Modal visible animationType="slide" transparent onRequestClose={onClose}>
      <View className="flex-1 bg-black/40 justify-end">
        <View className="h-[85%] w-full bg-white rounded-t-3xl overflow-hidden">
          <View className="flex-row justify-between items-center px-6 py-4 border-b border-gray-200">
            <View className="flex-1 pr-4">
              <Text className="text-lg font-semibold text-gray-900">
                {workout.title ?? "Entrenamiento"}
              </Text>
              <Text className="text-sm text-gray-500">
                {workout.date?.toLocaleDateString("es-ES", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </Text>
              <Text className="text-xs text-gray-400 mt-1">{`RP: ${
                workout.rp ?? "—"
              }`}</Text>
            </View>
            <TouchableOpacity
              onPress={onClose}
              className="w-10 h-10 rounded-full bg-gray-100 items-center justify-center"
            >
              <Ionicons name="close" size={20} color="#4b5563" />
            </TouchableOpacity>
          </View>
          <ScrollView
            contentContainerStyle={{ padding: 20, paddingBottom: 32 }}
            showsVerticalScrollIndicator={false}
          >
            {workout.exercises?.length ? (
              workout.exercises.map((entry, index) => (
                <View
                  key={`${entry.exercise?.id ?? entry.id ?? index}-${index}`}
                  className="mb-4 border border-gray-100 rounded-2xl p-4 bg-gray-50"
                >
                  <Text className="text-base font-semibold text-gray-900">
                    {entry.exercise?.name ?? `Ejercicio ${index + 1}`}
                  </Text>
                  <Text className="text-sm text-gray-500 mt-1">
                    {formatExerciseSummary(entry) ?? "Sin sets registradas"}
                  </Text>
                  <View className="mt-3 space-y-2">
                    {entry.sets?.length ? (
                      entry.sets.map((set, setIndex) => (
                        <View
                          key={`set-${entry.id ?? index}-${setIndex}`}
                          className="flex-row items-center justify-between"
                        >
                          <Text className="text-sm text-gray-600">
                            Serie {setIndex + 1}
                          </Text>
                          <Text className="text-sm text-gray-600">
                            {formatSetDetail(set, setIndex)}
                          </Text>
                        </View>
                      ))
                    ) : (
                      <Text className="text-sm text-gray-500">
                        Sin series detalladas
                      </Text>
                    )}
                  </View>
                </View>
              ))
            ) : (
              <Text className="text-sm text-gray-500 text-center">
                No hay ejercicios guardados para este entrenamiento.
              </Text>
            )}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const History = () => {
  const { isLoaded, user } = useUser();
  const { data: workouts = [], isLoading, isError, isRefetching, refetch } =
    useWorkoutHistoryQuery(user?.id);
  const [focusedWorkout, setFocusedWorkout] = useState<Workout | null>(null);
  const sections = useMemo(() => groupWorkoutsByMonth(workouts), [workouts]);

  if (!isLoaded) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center bg-gray-50">
        <ActivityIndicator size="large" color="#2563eb" />
      </SafeAreaView>
    );
  }

  const renderWorkout = ({ item }: { item: Workout }) => {
    const totalWeight = getTotalWeightLifted(item);
    const weightUnit = getPrimaryWeightUnit(item);
    const weightLabel = `${Math.round(totalWeight).toLocaleString("es-ES")} ${weightUnit}`;

    return (
      <TouchableOpacity
        onPress={() => setFocusedWorkout(item)}
        className="bg-white rounded-2xl p-5 mb-4 shadow-sm border border-gray-100"
      >
        <View className="flex-row justify-between items-start">
          <View className="flex-1 pr-3">
            <Text className="text-lg font-semibold text-gray-900">
              {item.title ?? "Entrenamiento"}
            </Text>
            <Text className="text-sm text-gray-500 mt-1">
              {item.date?.toLocaleDateString("es-ES", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
        </View>
        <View className="flex-row items-center justify-between mt-4">
          <View className="flex-row items-center space-x-1">
            <Ionicons name="time-outline" size={16} color="#2563eb" />
            <Text className="text-sm text-gray-600">
              {formatWorkoutDuration(item.duration)}
            </Text>
          </View>
          <View className="flex-row items-center space-x-1">
            <Ionicons name="barbell-outline" size={16} color="#059669" />
            <Text className="text-sm text-gray-600">{weightLabel}</Text>
          </View>
        </View>
        <Text className="text-xs text-gray-500 mt-3">
          {item.exercises?.length ?? 0} ejercicios registrados
        </Text>
      </TouchableOpacity>
    );
  };

  const renderSectionHeader = ({ section }: { section: { title: string } }) => (
    <View className="mt-6">
      <Text className="text-base font-semibold text-gray-700">
        {section.title}
      </Text>
    </View>
  );

  const renderEmpty = () => (
    <View className="flex-1 justify-center items-center py-12">
      {isLoading ? (
        <ActivityIndicator size="large" color="#2563eb" />
      ) : (
        <>
          <Ionicons name="barbell-outline" size={64} color="#9CA3AF" />
          <Text className="text-lg font-semibold text-gray-900 mt-4">
            {isError ? "No se pudo cargar tu historial" : "Aún no hay entrenamientos"}
          </Text>
          <Text className="text-center text-gray-500 mt-2 px-4">
            {isError
              ? "Intenta nuevamente en unos segundos."
              : "Registra tu primer entrenamiento para verlo aquí."}
          </Text>
          {isError && (
            <TouchableOpacity
              onPress={refetch}
              className="mt-4 px-4 py-2 rounded-full bg-blue-600"
            >
              <Text className="text-white font-semibold">Reintentar</Text>
            </TouchableOpacity>
          )}
        </>
      )}
    </View>
  );

  return (
    <>
      <WorkoutDetailModal workout={focusedWorkout} onClose={() => setFocusedWorkout(null)} />
      <SafeAreaView className="flex-1 bg-gray-50">
        <View className="px-6 py-4 bg-white border-b border-gray-200">
          <Text className="text-2xl font-bold text-gray-900">Historial</Text>
          <Text className="text-gray-500 mt-1">{workouts.length} entrenamientos</Text>
        </View>
        <SectionList
          sections={sections}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderWorkout}
          renderSectionHeader={renderSectionHeader}
          ListEmptyComponent={renderEmpty}
          refreshControl={
            <RefreshControl
              refreshing={isRefetching}
              onRefresh={refetch}
              tintColor="#2563eb"
              colors={["#2563eb"]}
            />
          }
          contentContainerStyle={{ padding: 24, paddingBottom: 48, flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
        />
      </SafeAreaView>
    </>
  );
};

export default History;
