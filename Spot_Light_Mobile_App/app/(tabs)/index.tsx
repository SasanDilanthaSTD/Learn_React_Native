import {Pressable, Text, TouchableOpacity, View } from "react-native";
import {styles} from "../../styles/test.style"
import { Link } from "expo-router";

export default function Index() {
  return (
    <View
      style={styles.container}
    >
      <Link href={'/notifications'}> ---{'>'} go to  Notifications</Link>
    </View>
  );
}

