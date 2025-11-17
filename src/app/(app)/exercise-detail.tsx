import React from 'react';
import { Image, ScrollView, StatusBar, Text, TouchableOpacity, View, RefreshControl, ActivityIndicator, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { getDifficultyColor, getDifficultyText, getMediaUrl } from '@/utils/lib/exercises';
import { useExerciseQuery } from '@/services/exercises/exercises.hooks';
import { useAiGuidanceQuery } from '@/services/ai/ai.hooks';
import Markdown from 'react-native-markdown-display';

const ExerciseDetail = () => {
    const router = useRouter();
    const { id } = useLocalSearchParams<{ id: string }>();
    const { data: exercise, isLoading, isError, isRefetching, refetch } = useExerciseQuery(id);
    const { data: aiGuidance, error: aiErrorRaw, isFetching: aiLoading, refetch: refetchAiGuidance } = useAiGuidanceQuery(exercise?.name);
    const aiError = aiErrorRaw ? "Couldn't generate guidance" : null;

    const getAiGuidance = React.useCallback(async () => {
        if (!exercise?.name) return;
        const result = await refetchAiGuidance();
        if (result.error)
            console.error("Error fetching AI guidance:", result.error);
    }, [exercise?.name, refetchAiGuidance]);

    return (
        <SafeAreaView className="flex flex-1 bg-white">
            <StatusBar barStyle="light-content" backgroundColor="#000" />
            {/* Header */}
            <View className="absolute top-12 left-0 right-0 z-10 px-4">
                <TouchableOpacity
                    onPress={() => router.back()}
                    className="h-10 w-10 bg-black/20 rounded-full items-center justify-center backdrop-blur-sm"
                >
                    <Ionicons name="close" size={24} color="#fff" />
                </TouchableOpacity>
            </View>
            {/* Body */}
            <ScrollView
                className="flex-1"
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl
                        refreshing={isRefetching}
                        onRefresh={refetch}
                        colors={['#3B82F6']}
                        tintColor="#3B82F6"
                        title="Pull to refresh"
                        titleColor="#6b7280"
                    />
                }
            >
                {isLoading ? (
                    <View className="h-80 items-center justify-center">
                        <ActivityIndicator size="large" />
                        <Text className="text-gray-600 mt-2">Loading Exercise…</Text>
                    </View>
                ) : isError ? (
                    <View className="h-80 items-center justify-center px-6">
                        <Ionicons name="warning" size={28} color="#ef4444" />
                        <Text className="text-gray-900 font-semibold mt-2">Error loading exercise</Text>
                        <Text className="text-gray-500 mt-1 text-center">
                            Pull down to retry or go back.
                        </Text>
                    </View>
                ) : (
                    <>
                        {/* Image */}
                        <View className="h-60 bg-white relative">
                            {exercise?.image ? (
                                <Image
                                    source={{ uri: getMediaUrl(exercise) }}
                                    className="w-full h-full"
                                    resizeMode="contain"
                                />
                            ) : (
                                <View className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500 items-center justify-center">
                                    <Ionicons name="fitness" size={80} color="white" />
                                </View>
                            )}
                            <View className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/60 to-transparent" />
                        </View>
                        {/* Content */}
                        <View className="px-5 py-6">
                            {/* Title and difficulty */}
                            <View className="flex-row items-start justify-between mb-2">
                                <View className="flex-1 mr-4">
                                    <Text className="text-3xl font-bold text-gray-800 mb-2">{exercise?.name}</Text>
                                    <View className={`self-start px-4 py-2 rounded-full ${getDifficultyColor(exercise.difficulty)}`}>
                                        <Text className="text-sm font-semibold text-white">{getDifficultyText(exercise?.difficulty)}</Text>
                                    </View>
                                </View>
                            </View>
                            {/* Description */}
                            <View className='mb-6'>
                                <Text className="text-lg font-semibold text-gray-800 mb-2 mt-2">
                                    Description
                                </Text>
                                {exercise?.description ? (
                                    <Text className="text-gray-600">{exercise.description}</Text>
                                ) : (
                                    <Text className="text-gray-400">No description available</Text>
                                )}
                            </View>
                            {/* Video Section */}
                            {exercise?.videoUrl && (
                                <View className="mb-6">
                                    <View className="flex-row items-center mb-3">
                                        <Ionicons name="videocam" size={24} color="#ef4444" />
                                        <Text className="text-lg font-semibold text-gray-800 ml-2">
                                            Video Tutorial
                                        </Text>
                                    </View>
                                    <TouchableOpacity
                                        className="bg-red-500 rounded-xl p-4 flex-row items-center"
                                        onPress={() => Linking.openURL(exercise.videoUrl)}
                                    >
                                        <View className="w-12 h-12 bg-white rounded-full items-center justify-center mr-4">
                                            <Ionicons name="play" size={24} color="#f43f5e" />
                                        </View>
                                        <View>
                                            <Text className="text-white font-semibold text-lg">Watch Video</Text>
                                            <Text className="text-red-100 text-sm">
                                                Learn proper form and technique
                                            </Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            )}
                            {/* AI Guidance */}
                            {aiError ? (
                                <View className="p-4 bg-red-100 rounded-xl mb-6">
                                    <Text className="text-red-600">{aiError}</Text>
                                </View>
                            ) : aiGuidance ? (
                                <>
                                    <View className="flex-row items-center mb-3">
                                        <Ionicons name="fitness" size={24} color="#3B82F6" />
                                        <Text className="text-xl font-semibold text-gray-800 ml-2">
                                            AI Coach Guidance
                                        </Text>
                                    </View>
                                    <View className="bg-blue-50 rounded-xl p-4 border-l-4 border-blue-400 mb-2">
                                        <Markdown
                                            style={{
                                                body: {
                                                    paddingBottom: 20,
                                                },
                                                heading2: {
                                                    fontSize: 18,
                                                    fontWeight: "bold",
                                                    color: "#1f2937",
                                                    marginTop: 12,
                                                    marginBottom: 6,
                                                },
                                                heading3: {
                                                    fontSize: 16,
                                                    fontWeight: "600",
                                                    color: "#374151",
                                                    marginTop: 8,
                                                    marginBottom: 4,
                                                },
                                                image: {
                                                    borderRadius: 12,
                                                    marginTop: 12,
                                                    marginBottom: 12,
                                                    alignSelf: "center",
                                                },
                                                paragraph: {
                                                    color: "#374151",
                                                    fontSize: 14,
                                                    lineHeight: 20,
                                                    marginBottom: 8,
                                                },
                                                bullet_list: {
                                                    marginBottom: 8,
                                                },
                                                ordered_list: {
                                                    marginBottom: 8,
                                                },
                                                list_item: {
                                                    fontSize: 14,
                                                    lineHeight: 20,
                                                    color: "#374151",
                                                    marginBottom: 4,
                                                },
                                            }}
                                        >
                                            {aiGuidance}
                                        </Markdown>
                                    </View>
                                </>
                            ) : null}

                            {/* Action Buttons */}
                            <View className="mt-1 gap-2">
                                {/* AI Coach Button */}
                                <TouchableOpacity
                                    className={`rounded-xl py-4 items-center ${aiLoading ? 'bg-gray-400' : aiGuidance ? 'bg-green-600' : 'bg-blue-600'}`}
                                    onPress={getAiGuidance}
                                    disabled={aiLoading}
                                >
                                    {aiLoading ? (
                                        <View className="flex-row items-center">
                                            <ActivityIndicator size="small" color="#fff" />
                                            <Text className="text-white font-semibold text-lg ml-2">Loading AI Coach...</Text>
                                        </View>
                                    ) : (
                                        <Text className="text-white font-bold text-lg">
                                            {aiGuidance ? 'Refresh AI Guidance' : 'Get AI Guidance on Form & Technique'}
                                        </Text>
                                    )}
                                </TouchableOpacity>
                                <TouchableOpacity className="bg-gray-200 rounded-xl py-4 items-center" onPress={() => router.back()}>
                                    <Text className="text-center text-gray-800 font-bold text-lg">
                                        Close
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </>
                )}
            </ScrollView>
        </SafeAreaView>
    );
};

export default ExerciseDetail;