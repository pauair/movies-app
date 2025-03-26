import { View, Text, Pressable} from 'react-native';
import { useRouter } from 'expo-router';
import LoginForm from './LoginForm';

const Login = () => {

    const router = useRouter();

    const handleLogin = (user) => {
        console.log(user);
    };

    return (
      <View>
          <Text>Login</Text>
          <LoginForm onLogin={handleLogin} />
          <Pressable onPress={() => router.replace('/register')}>
              <Text> Don't have an account? Register</Text>
          </Pressable>
      </View>
    );
};

export default Login;
