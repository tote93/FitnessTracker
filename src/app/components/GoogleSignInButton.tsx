import React from 'react'
import * as WebBrowser from 'expo-web-browser'
import { Text, View, Button, TouchableOpacity } from 'react-native'
import { Link } from 'expo-router'
import { useOAuth } from '@clerk/clerk-expo'
import * as Linking from 'expo-linking'
import { Ionicons } from '@expo/vector-icons'

export const useWarmUpBrowser = () => {
    React.useEffect(() => {
        // Warm up the android browser to improve UX
        // https://docs.expo.dev/guides/authentication/#improving-user-experience
        void WebBrowser.warmUpAsync()
        return () => {
            void WebBrowser.coolDownAsync()
        }
    }, [])
}

WebBrowser.maybeCompleteAuthSession()

export default function GoogleSignInButton() {
    useWarmUpBrowser()

    const { startOAuthFlow } = useOAuth({ strategy: 'oauth_google' })

    const onPress = React.useCallback(async () => {
        try {
            const { createdSessionId, signIn, signUp, setActive } = await startOAuthFlow({
                redirectUrl: Linking.createURL('/dashboard', { scheme: 'myapp' }),
            })

            // If sign in was successful, set the active session
            if (createdSessionId) {
                setActive!({ session: createdSessionId })
            } else {
                // Use signIn or signUp returned from startOAuthFlow
                // for next steps, such as MFA
            }
        } catch (err) {
            // See https://clerk.com/docs/guides/development/custom-flows/error-handling
            // for more info on error handling
            console.error(JSON.stringify(err, null, 2))
        }
    }, [])

    return (
        <TouchableOpacity
            onPress={onPress}
            className="bg-white border-2 border-gray-200 rounded-xl py-4 shadow-sm"
            activeOpacity={0.8}>
            <View className="flex-row items-center justify-center">
                <Ionicons name="logo-google" size={20} color="#EA4335" />
                <Text className="text-gray-900 font-semibold text-lg ml-3">
                    Continue with Google
                </Text>
            </View>
        </TouchableOpacity>
    )
}