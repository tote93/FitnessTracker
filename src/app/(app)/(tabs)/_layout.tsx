import React from 'react'
import { Tabs } from 'expo-router'
import { AntDesign } from '@expo/vector-icons'
import { Image } from 'react-native';

const Layout = () => {
    const url = 'https://avatars.githubusercontent.com/u/6764957?v=4'
    return (<Tabs>
        <Tabs.Screen name="index" options={{
            headerShown: false, title: "Home",
            tabBarIcon: ({ color, size }) => <AntDesign name='home' color={color} size={size} />
        }} />
        {/* Exercise Tab */}
        <Tabs.Screen name="exercises" options={{
            headerShown: false, title: "Exercises",
            tabBarIcon: ({ color, size }) => <AntDesign name='book' color={color} size={size} />
        }} />
        {/* Workout Tab */}
        <Tabs.Screen name="workout" options={{
            headerShown: false, title: "Workout",
            tabBarIcon: ({ color, size }) => <AntDesign name='play-circle' color={color} size={size} />
        }} />
        {/* Active Workout Tab - Href set to null, to not be displayed */}
        <Tabs.Screen name="active-workout" options={{
            headerShown: false, title: "Active Workout", href: null, tabBarStyle: { display: 'none' },
        }} />
        {/* History */}
        <Tabs.Screen name="history" options={{
            headerShown: false, title: "History",
            tabBarIcon: ({ color, size }) => <AntDesign name='clock-circle' color={color} size={size} />
        }} />
        {/* Profile Tab */}
        <Tabs.Screen
            name="profile"
            options={{
                headerShown: false,
                title: "Profile",
                tabBarIcon: ({ color, size }) => (
                    <Image
                        source={{ uri: url }}
                        style={{ width: 28, height: 28, borderRadius: 100 }}
                    />
                ),
            }}
        />
    </Tabs>)
}

export default Layout