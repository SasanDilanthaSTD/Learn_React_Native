import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { styles } from '@/styles/auth.styles'
import { Ionicons } from '@expo/vector-icons'
import { COLORS } from '@/constants/theme'
import { useSSO } from '@clerk/clerk-expo'
import { useRouter } from 'expo-router'

const Login = () => {

  // logic of google sign in
  const { startSSOFlow } = useSSO();
  const router = useRouter();

  const hadleGoogleSignIn = async () => {
    try{
      const { createSessionId, setActive } = await startSSOFlow({strategy: "oauth_google"});

      if(setActive && createSessionId ){
        setActive({session: createSessionId});
        router.replace("/(tabs)")
      }
    }catch (err){
      console.error("Oauth error: ", err);
    }
  }

  return (
    <View style={styles.container}>
      {/* BARND SECTION */}
      <View style={styles.brandSection}>
        <View style={styles.logoContainer}>
          <Ionicons name='leaf' size={32} color={COLORS.primary} />
        </View>
        <Text style={styles.appName}>soptlight</Text>
        <Text style={styles.tagline}>don't miss anythings</Text>
      </View>

      {/* ILLASTRATION */}
      <View style={styles.illustrationContainer}>
        <Image
          source={require('@/assets/images/auth_bg_2.png')}
          style={styles.illustration}
          resizeMode='cover'
        />
      </View>

      {/* LOGIN SECTION */}
      <View style={styles.loginSection}>
         <TouchableOpacity
         style={styles.googleButton}
         onPress={hadleGoogleSignIn}
         activeOpacity={0.9}
         >
          <View style={styles.googleIconContainer}>
            <Ionicons name='logo-google' size={20} color={COLORS.surface} />
          </View>
          <Text style={styles.googleButtonText}>Continue with Google</Text>
         </TouchableOpacity>

         <Text style={styles.termsText}>
          By continueing, you agree to our term and Privacy Plicy
         </Text>
      </View>
    </View>
  )
}

export default Login