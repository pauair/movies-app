import { View, Text, Pressable} from 'react-native';
import { useRouter } from 'expo-router';
import LoginForm from './LoginForm';

const Login = () => {

    const router = useRouter();

    const handleLogin = (user) => {
        console.log(user);
    };

    return (
        <View className='bg-black h-full items-center'>
          <Text className='text-white font-bold text-xl my-16'>Log in to your account</Text>
          <LoginForm onLogin={handleLogin} />
          <Pressable onPress={() => router.replace('/register')}>
              <Text className='text-white mt-8 text-base'> Don't have an account? Register</Text>
          </Pressable>
      </View>
    );
};

export default Login;
