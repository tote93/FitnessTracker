// /app/(app)/sign-in.tsx
import { SafeAreaView } from 'react-native-safe-area-context'
import { KeyboardAvoidingView, Platform, View, Text } from 'react-native'
import { Link } from 'expo-router'
import useSignInFlow from '../hooks/useSignInFlow'
import AuthHeader from '../components/auth/AuthHeader'
import SignInForm from '../components/auth/SignInForm'
import SocialSignInSection from '../components/auth/SocialSignInSection'


export default function SignInScreen() {
    const { emailAddress, setEmailAddress, password, setPassword, isLoading, handleSignIn } = useSignInFlow()

    return (
        <SafeAreaView className="flex flex-1 bg-gray-50">
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                className="flex flex-1"
            >
                <View className="flex-1 px-4 justify-center">
                    {/* Header / Branding */}
                    <AuthHeader
                        iconName="fitness"
                        title="FitTracker"
                        subtitle={`Track your fitness journey\nand reach your goals`}
                    />

                    {/* Form */}
                    <SignInForm
                        email={emailAddress}
                        onChangeEmail={setEmailAddress}
                        password={password}
                        onChangePassword={setPassword}
                        onSubmit={handleSignIn}
                        isLoading={isLoading}
                    />

                    {/* Social auth */}
                    <SocialSignInSection />

                    {/* Footer */}
                    <View className="flex-row justify-center mt-8">
                        <Text className="text-center text-gray-600">
                            Don't have an account?{' '}
                            <Link href="/sign-up" className="text-blue-600 font-semibold">
                                Sign Up
                            </Link>
                        </Text>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}
