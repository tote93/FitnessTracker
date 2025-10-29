// /app/components/auth/AuthHeader.tsx
import { View, Text } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

type AuthHeaderProps = {
    iconName: keyof typeof Ionicons.glyphMap
    title: string
    subtitle: string
}

export default function AuthHeader({ iconName, title, subtitle }: AuthHeaderProps) {
    return (
        <View className="items-center mb-8">
            <View className="w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl items-center justify-center mb-4 shadow-lg">
                <Ionicons name={iconName} size={40} color="white" />
            </View>

            <Text className="text-3xl font-bold text-gray-900 mb-2">
                {title}
            </Text>

            <Text className="text-lg text-gray-600 text-center">
                {subtitle}
            </Text>
        </View>
    )
}
