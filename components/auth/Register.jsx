import { View, Text, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import RegisterForm from './RegisterForm';

const Register = () => {

  const router = useRouter();

  const handleRegister = (user) => {
    console.log(user);
  };

  return (
    <View>
      <Text>Register</Text>
      <RegisterForm onRegister={handleRegister} />
      <Pressable onPress={() => router.replace('/login')}>
        <Text>Already have an account? Login</Text>
      </Pressable>
    </View>
  );
};

export default Register;
