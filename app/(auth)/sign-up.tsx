import CustomButton from '@/components/CustomButton';
import CustomInput from '@/components/CustomInput';
import { Link, router } from 'expo-router';
import { useState } from 'react';
import { Alert, Text, View } from 'react-native';

const SignUp = () => {

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({name: '', email: '', password: ''});

  const submit = async () => {
    if(!form.name || !form.email || !form.password) return Alert.alert('Error', 'Please enter valid Details');

    setIsSubmitting(true);

    try{
      // Appwrite sign up

      Alert.alert('Success','User Signed Up successfully');
      router.replace('/');
    }
    catch(e: any){
      Alert.alert('Error', e.message);
    }
    finally{
      setIsSubmitting(false);
    }
  }

  return (
    <View className='gap-10 bg-white rounded-lg p-5 mt-5'>
      
      <CustomInput 
            placeholder='Enter your Full Name'
            value={form.name}
            onChangeText={(text)=>setForm((prev)=>({...prev, name: text}))}
            label='Email'
            keyboardType='email-address'
      />
      <CustomInput 
            placeholder='Enter your email'
            value={form.email}
            onChangeText={(text)=>setForm((prev)=>({...prev, email: text}))}
            label='Email'
            keyboardType='email-address'
      />
      <CustomInput 
            placeholder='Enter your password'
            value={form.password}
            onChangeText={(pass)=>setForm((prev)=>({...prev, password: pass}))}
            label='Password'
            secureTextEntry={true}
      />
      <CustomButton 
        title='Sign Up'
        onPress={submit}
      />
      <View className='flex justify-center mt-5 flex-row gap-2'>
        <Text className='base-regular text-grey-100'>
            Already have an account?
        </Text>
        <Link href="/(auth)/sign-in" className='base-bold text-primary'>
          Sign In
        </Link>
      </View>
    </View>
  )
}

export default SignUp;

// ?1:08:34