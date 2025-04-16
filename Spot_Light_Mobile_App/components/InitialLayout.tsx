import React, { useEffect } from 'react'
import { useAuth } from '@clerk/clerk-expo'
import { Stack, useRouter, useSegments } from 'expo-router';

export default function InitialLayout() {
    const { isLoaded, isSignedIn } = useAuth();

    const segments = useSegments();
    const router = useRouter()

    useEffect(() =>{
        if (!isLoaded) return;
        // console.log("segments : ", segments)
        let seg = "/" + segments[0] + "/" + segments[1];
        // console.log("segments : ", seg)
        // console.log("login status : ", isSignedIn)

        const inAuthScreen = seg === "/(auth)/login";

        if(!isSignedIn && !inAuthScreen) router.replace('/(auth)/login');
        else if (isSignedIn && inAuthScreen) router.replace('/(tabs)');

    }, [isLoaded, isSignedIn, segments]);

    if (!isLoaded) return null

    return <Stack screenOptions={{headerShown: false, statusBarBackgroundColor: 'black'}} />
}