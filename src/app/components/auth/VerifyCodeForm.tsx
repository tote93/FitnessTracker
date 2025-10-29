import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

type VerifyCodeFormProps = {
    code: string
    onChangeCode: (v: string) => void
    onVerify: () => void
    onResend: () => void
    isLoading: boolean
    emailAddress: string
}

export default function VerifyCodeForm({
    code,
    onChangeCode,
    onVerify,
    onResend,
    isLoading,
    emailAddress,
}: VerifyCodeFormProps) {
    return (
        <View className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
            <Text className="text-2xl font-bold text-gray-900 mb-6 text-center">
                Email Verification
            </Text>

            {/* Code input */}
            <View className="mb-4">
                <Text className="text-sm font-medium text-gray-700 mb-2">Verification Code</Text>
                <View className="flex-row items-center rounded-xl px-4 py-4 border border-gray-50">
                    <Ionicons name="key" size={20} color="#6B7280" />
                    <TextInput
                        autoCapitalize="none"
                        value={code}
                        placeholder="Enter your verification code"
                        placeholderTextColor={'#9CA3AF'}
                        onChangeText={onChangeCode}
                        className="flex-1 text-gray-900 text-center ml-2"
                        editable={!isLoading}
                    />
                </View>
            </View>

            {/* Verify button */}
            <TouchableOpacity
                onPress={onVerify}
                disabled={isLoading}
                className={`rounded-xl py-4 ${isLoading ? 'bg-gray-400' : 'bg-green-400'}`}
                activeOpacity={0.8}
            >
                <View className="flex-row justify-center items-center">
                    {isLoading ? (
                        <Ionicons name="refresh" size={24} color="white" />
                    ) : (
                        <Ionicons name="checkmark-circle-outline" size={24} color="white" />
                    )}
                    <Text className="text-white font-semibold text-lg ml-2">
                        {isLoading ? 'Verifying...' : 'Verify'}
                    </Text>
                </View>
            </TouchableOpacity>

            {/* Resend */}
            <View className="mt-4">
                <Text className="text-center text-gray-600">
                    Didn't receive the code?{' '}
                    <Text onPress={onResend} className="text-blue-600 font-semibold">
                        Resend
                    </Text>
                </Text>

                <Text className="text-center text-gray-500 mt-2 text-xs">
                    Sent to {emailAddress}
                </Text>
            </View>
        </View>
    )
}
