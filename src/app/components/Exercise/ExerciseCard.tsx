import { Image, TouchableOpacity, View, Text } from 'react-native';
import React from 'react';
import { Exercise } from '@/services/types';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { getDifficultyColor, getDifficultyText, getMediaUrl } from '@/utils/lib/exercises';

interface ExerciseCardProps {
    item: Exercise;
    onPress: () => void;
    showChevron?: boolean;
}

const ExerciseCard = ({ item, onPress, showChevron = false }: ExerciseCardProps) => {
    const imageUrl = item.image && item.image.url ? getMediaUrl(item) : null;

    return (
        <TouchableOpacity onPress={onPress} className="bg-white rounded-2xl p-4 mb-4 shadow">
            <View className="flex-row p-1">
                <View className="w-20 h-20 bg-white rounded-xl mr-4 overflow-hidden">
                    {imageUrl ? (
                        <Image source={{ uri: imageUrl }} className="w-full h-full" resizeMode="contain" />
                    ) : (
                        <View className="flex-1 justify-center items-center bg-gray-200">
                            <AntDesign name="picture" size={24} color="#9CA3AF" />
                        </View>
                    )}
                </View>
                {/* Description Details */}
                <View className='flex-1 justify-between'>
                    <View>
                        <Text className="text-lg font-bold text-gray-900 mb-1">{item.name}</Text>
                        <Text className="text-sm text-gray-600 mb-2" numberOfLines={2}>{item.description || "No description available"}</Text>
                    </View>
                    {/* Difficulty */}
                    <View className="flex-row justify-between items-center">
                        <View className={`px-3 py-1 rounded-full ${getDifficultyColor(item.difficulty)}`}>
                            <Text className="text-xs text-white font-semibold">
                                {getDifficultyText(item.difficulty)}
                            </Text>
                        </View>
                        {showChevron && (
                            <TouchableOpacity className="p-2">
                                <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
                            </TouchableOpacity>
                        )}
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default ExerciseCard;
