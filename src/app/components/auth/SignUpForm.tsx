import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

type SignUpFormProps = {
    email: string
    onChangeEmail: (v: string) => void
    password: string
    onChangePassword: (v: string) => void
    onSubmit: () => void
    isLoading: boolean
}

export default function SignUpForm({
    email,
    onChangeEmail,
    password,
    onChangePassword,
    onSubmit,
    isLoading,
}: SignUpFormProps) {
    return (
        <View className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
            <Text className="text-2xl font-bold text-gray-900 mb-6 text-center">
                Create an account
            </Text>

            {/* Email */}
            <View className="mb-4">
                <Text className="text-sm font-medium text-gray-700 mb-2">Email Address</Text>
                <View className="flex-row items-center rounded-xl px-4 py-4 border border-gray-50">
                    <Ionicons name="mail" size={20} color="#6B7280" />
                    <TextInput
                        autoCapitalize="none"
                        value={email}
                        placeholder="Enter your email"
                        onChangeText={onChangeEmail}
                        className="flex-1 ml-2"
                    />
                </View>
            </View>

            {/* Password */}
            <View className="mb-4">
                <Text className="text-sm font-medium text-gray-700 mb-2">Password</Text>
                <View className="flex-row items-center rounded-xl px-4 py-4 border border-gray-50">
                    <Ionicons name="lock-closed-outline" size={20} color="#6B7280" />
                    <TextInput
                        autoCapitalize="none"
                        value={password}
                        placeholder="Create a password"
                        onChangeText={onChangePassword}
                        className="flex-1 ml-2"
                        secureTextEntry
                    />
                </View>
            </View>

            {/* CTA */}
            <TouchableOpacity
                disabled={isLoading}
                onPress={onSubmit}
                className={`rounded-xl py-4 mt-2 ${isLoading ? 'bg-gray-400' : 'bg-blue-600'}`}
                activeOpacity={0.8}
            >
                <Text className="text-white text-center font-semibold text-lg">
                    {isLoading ? 'Creating account…' : 'Continue'}
                </Text>
            </TouchableOpacity>
        </View>
    )
}
