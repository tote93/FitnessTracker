import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

type SignInFormProps = {
    email: string
    onChangeEmail: (v: string) => void
    password: string
    onChangePassword: (v: string) => void
    onSubmit: () => void
    isLoading: boolean
}

export default function SignInForm({ email, onChangeEmail, password, onChangePassword, onSubmit, isLoading }: SignInFormProps) {
    return (
        <>
            <View className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
                <Text className="text-2xl font-bold text-gray-900 mb-6 text-center">
                    Welcome Back
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
                            placeholderTextColor="#9CA3AF"
                            className="flex-1 text-gray-900 ml-3"
                            editable={!isLoading}
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
                            placeholder="Enter your password"
                            onChangeText={onChangePassword}
                            placeholderTextColor="#9CA3AF"
                            className="flex-1 text-gray-900 ml-3"
                            editable={!isLoading}
                            secureTextEntry
                        />
                    </View>
                </View>
            </View>
            {/* Buttons */}
            <TouchableOpacity
                onPress={onSubmit}
                disabled={isLoading}
                className={`rounded-xl p-4 mb-4 items-center ${isLoading ? 'bg-blue-600 opacity-50' : 'bg-blue-600 opacity-100'
                    }`}
                activeOpacity={0.8}
            >
                <View className="flex-row items-center justify-center">
                    {isLoading ? (
                        <Ionicons name="refresh" size={20} color="white" />
                    ) : (
                        <Ionicons name="log-in-outline" size={20} color="white" />
                    )}
                    <Text className="text-white font-semibold text-lg ml-2">
                        {isLoading ? 'Signing In...' : 'Sign In'}
                    </Text>
                </View>
            </TouchableOpacity>
        </>
    )
}
