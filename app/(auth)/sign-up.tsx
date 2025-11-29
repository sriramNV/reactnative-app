import { router } from 'expo-router';
import { Button, Text, View } from 'react-native';



const SignUp = () => {
  return (
    <View>
      <Text>sign-up</Text>
      <Button title='Sign In' onPress={() => router.push("/(auth)/sign-in")} />

    </View>
  )
}

export default SignUp