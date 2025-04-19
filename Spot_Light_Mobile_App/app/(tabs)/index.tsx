import {Pressable, Text, TouchableOpacity, View } from "react-native";
import { Link } from "expo-router";
import { styles } from "@/styles/auth.styles";
import { COLORS } from "@/constants/theme";
import { useAuth } from "@clerk/clerk-expo";

export default function Index() {
  const { signOut } = useAuth()

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => signOut()}>
        <Text style={{color: COLORS.grey}}>
          Signout
        </Text>
      </TouchableOpacity>
    </View>
  );
}

