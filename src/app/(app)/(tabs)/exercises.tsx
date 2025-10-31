import { FlatList, RefreshControl, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useMemo, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import { useExercisesQuery } from '@/services/exercises/exercises.hooks'
import { useDebouncedValue } from '@/utils/hooks/useDebouncedValue'
import ExerciseCard from '@/app/components/Exercise/ExerciseCard'

const Exercises = () => {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState("");

    // Debounce search input to limit API calls
    const debouncedQuery = useDebouncedValue(searchQuery, 300);

    // Build Strapi filters only when there's a query
    const filters = useMemo(() => {
        if (!debouncedQuery.trim()) return undefined;
        return {
            $or: [{ name: { $containsi: debouncedQuery } }, { description: { $containsi: debouncedQuery } }],
        };
    }, [debouncedQuery]);

    const { data: exercises = [], isLoading, isError, isRefetching, refetch } = useExercisesQuery({
        fields: ['id', 'name', 'description', 'difficulty'],
        populate: { image: { fields: ['url'] } },
        filters,
        sort: ['name:asc'],
    });

    return (
        <SafeAreaView className="flex flex-1 bg-gray-50">
            {/* Header */}
            <View className="px-6 py-4 bg-white border-b border-gray-200">
                <Text className="text-2xl font-bold text-gray-900">Exercise Library</Text>
                <Text className="text-gray-500 mt-1">Discover and master new exercises</Text>
                {/* Search Bar */}
                <View className="flex-row items-center bg-gray-100 rounded-xl px-4 py-3 mt-3">
                    <Ionicons name="search" size={20} color="#6B7280" />
                    <TextInput
                        className='flex-1 ml-3 text-gray-800'
                        placeholder='Search exercises...'
                        placeholderTextColor={"#9CA3AF"}
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                    />
                    {searchQuery.length > 0 && (
                        <TouchableOpacity onPress={() => setSearchQuery("")}>
                            <Ionicons name="close-circle" size={20} color="#6B7280" />
                        </TouchableOpacity>
                    )}
                </View>
            </View>
            {/* Exercise List Placeholder */}
            <FlatList
                data={exercises}
                keyExtractor={(item) => item.id.toString()}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                    <ExerciseCard item={item}
                        onPress={() => router.push(`/exercise-detail?id=${item.id}`)} />
                )}
                contentContainerStyle={{ padding: 24 }}
                ListEmptyComponent={() => (
                    <View className="bg-white rounded-2xl p-8 items-center">
                        <Ionicons name="barbell" size={64} color="#3B82F6" />
                        <Text className="text-lg font-semibold text-gray-900 mt-4">
                            {isLoading ? "Loading..." : isError ? "Error loading exercises."
                                : debouncedQuery ? "No exercises match your search." : "No exercises available."}
                        </Text>
                        <Text className="text-center text-gray-500 mt-2">
                            {debouncedQuery ? "Try adjusting your search terms." : "Please check back later."}
                        </Text>
                    </View>
                )}
                refreshControl={
                    <RefreshControl
                        refreshing={isRefetching} // Pull to refresh state
                        onRefresh={refetch}
                        colors={['#3B82F6']} // Android
                        tintColor="#3B82F6" // iOS
                        title='Pull to refresh exercises'
                        titleColor={'#6b7280'}
                    />
                }
            ></FlatList>
        </SafeAreaView>
    )
}

export default Exercises