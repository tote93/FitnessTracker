import { View, Text } from 'react-native'
import GoogleSignInButton from '../GoogleSignInButton'

export default function SocialSignInSection() {
    return (
        <>
            {/* Divider */}
            <View className="flex-row items-center mb-4 mx-6">
                <View className="flex-1 h-px bg-gray-200" />
                <Text className="px-4 text-gray-500">or</Text>
                <View className="flex-1 h-px bg-gray-200" />
            </View>

            {/* Google Sign In */}
            <GoogleSignInButton />
        </>
    )
}
