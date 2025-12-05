import CustomButton from '@/components/CustomButton';
import CustomInput from '@/components/CustomInput';
import { signIn } from '@/lib/appwrite';
import { Link, router } from 'expo-router';
import { useState } from 'react';
import { Alert, Text, View } from 'react-native';

const SignIn = () => {

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({email: '', password: ''});

  const submit = async () => {

    const {email, password} = form;

    if(!email || !password) return Alert.alert('Error', 'Please enter valid Email and Password');

    setIsSubmitting(true);

    try{
      await signIn({ email, password});

      
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
        title='Log in'
        onPress={submit}
      />
      <View className='flex justify-center mt-5 flex-row gap-2'>
        <Text className='base-regular text-grey-100'>
            No account?
        </Text>
        <Link href="/(auth)/sign-up" className='base-bold text-primary'>
          Sign up
        </Link>
      </View>
    </View>
  )
}

export default SignIn;

// ?1:08:34