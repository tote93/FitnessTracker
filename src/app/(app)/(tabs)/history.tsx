import { ActivityIndicator, FlatList, RefreshControl, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useUser } from "@clerk/clerk-expo";
import { Workout } from "@/services/types";
import { useWorkoutHistoryQuery } from "@/services/history/history.hooks";
import { formatWorkoutDate, formatWorkoutDuration } from "@/utils/lib/format";
import { formatExerciseSummary } from "@/utils/lib/history";
import { Ionicons } from "@expo/vector-icons";



const History = () => {
  const { isLoaded, user } = useUser();
  const { data: workouts = [], isLoading, isError, isRefetching, refetch } = useWorkoutHistoryQuery(user?.id);

  if (!isLoaded) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center bg-gray-50">
        <ActivityIndicator size="large" color="#2563eb" />
      </SafeAreaView>
    );
  }

  const renderWorkout = ({ item }: { item: Workout }) => (
    <View className="bg-white rounded-2xl p-5 mb-4 shadow-sm border border-gray-100">
      <View className="flex-row justify-between items-center">
        <Text className="text-lg font-semibold text-gray-900">{formatWorkoutDate(item.date)}</Text>
        <Text className="text-sm text-gray-500">{formatWorkoutDuration(item.duration)}</Text>
      </View>
      {item.calories_estimate && (
        <Text className="text-xs text-gray-500 mt-1">
          {Math.round(item.calories_estimate)} kcal estimated
        </Text>
      )}
      <View className="mt-4 space-y-3">
        {item.exercises?.length ? (
          item.exercises.map((exerciseEntry, idx) => {
            const label = exerciseEntry.exercise?.name ?? `Ejercicio ${idx + 1}`;
            const summary = formatExerciseSummary(exerciseEntry);
            return (
              <View
                key={`${exerciseEntry.id ?? idx}`}
                className="border border-gray-100 rounded-2xl px-4 py-3 bg-gray-50"
              >
                <Text className="font-semibold text-gray-900">{label}</Text>
                <Text className="text-sm text-gray-500 mt-1">
                  {summary ?? "Sin datos de sets o peso"}
                </Text>
              </View>
            );
          })
        ) : (
          <Text className="text-sm text-gray-500">No hay ejercicios registrados para este entrenamiento.</Text>
        )}
      </View>
    </View>
  );

  const renderEmpty = () => (
    <View className="flex-1 items-center justify-center py-12">
      {isLoading ? (
        <ActivityIndicator size="large" color="#2563eb" />
      ) : (
        <>
          <Ionicons name="barbell-outline" size={64} color="#9CA3AF" />
          <Text className="text-lg font-semibold text-gray-900">
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
    <SafeAreaView className="flex-1 bg-gray-50">
      <View className="px-6 py-4 bg-white border-b border-gray-200">
        <Text className="text-2xl font-bold text-gray-900">Historial</Text>
        <Text className="text-gray-500 mt-1">{workouts.length} entrenamientos</Text>
      </View>
      <FlatList
        contentContainerStyle={{ padding: 24, paddingBottom: 48, flexGrow: 1 }}
        data={workouts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderWorkout}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={renderEmpty}
        refreshControl={
          <RefreshControl
            refreshing={isRefetching}
            onRefresh={refetch}
            tintColor="#2563eb"
            colors={["#2563eb"]}
          />
        }
      />
    </SafeAreaView>
  );
};

export default History;
