// /app/(app)/sign-up.tsx
import { SafeAreaView } from 'react-native-safe-area-context'
import { KeyboardAvoidingView, Platform, View } from 'react-native'
import useSignUpFlow from '../hooks/useSignUpFlow'
import AuthHeader from '../components/auth/AuthHeader'
import SignUpForm from '../components/auth/SignUpForm'
import VerifyCodeForm from '../components/auth/VerifyCodeForm'

export default function SignUpScreen() {
    const { emailAddress, setEmailAddress, password, setPassword, code, setCode, pendingVerification, isLoading, handleSignUp, handleVerify, resendCode } = useSignUpFlow()

    return (
        <SafeAreaView className="flex flex-1 bg-gray-50">
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                className="flex flex-1"
            >
                <View className="flex-1 px-6 justify-center">
                    {/* Header dinámico */}
                    {pendingVerification ? (
                        <AuthHeader
                            iconName="mail"
                            title="Check Your Email"
                            subtitle={`We sent a verification code to\n${emailAddress}`}
                        />
                    ) : (
                        <AuthHeader
                            iconName="fitness"
                            title="Join FitTracker"
                            subtitle={`Start your fitness journey\nand achieve your goals`}
                        />
                    )}
                    {pendingVerification ? (
                        <VerifyCodeForm
                            code={code}
                            onChangeCode={setCode}
                            onVerify={handleVerify}
                            onResend={resendCode}
                            isLoading={isLoading}
                            emailAddress={emailAddress}
                        />
                    ) : (
                        <SignUpForm
                            email={emailAddress}
                            onChangeEmail={setEmailAddress}
                            password={password}
                            onChangePassword={setPassword}
                            onSubmit={handleSignUp}
                            isLoading={isLoading}
                        />
                    )}
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}
