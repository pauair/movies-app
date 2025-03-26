import { View, Text} from 'react-native';
import { Link } from 'expo-router';
import LoginForm from './LoginForm';

const Login = () => {

  const handleLogin = (user) => {
    console.log(user);
  };

  return (
    <View>
      <Text>Login</Text>
      <LoginForm onLogin={handleLogin} />
      <Link asChild href={'./Register'} >
        <Text> Don't have an account? Register</Text>
       </Link>
    </View>
  );
};

export default Login;
