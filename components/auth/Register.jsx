import { View, Text } from 'react-native';
import RegisterForm from './RegisterForm';

const Register = () => {
  const handleRegister = (user) => {
    console.log(user);
  };

  return (
    <View>
      <Text>Register</Text>
      <RegisterForm onRegister={handleRegister} />
    </View>
  );
};

export default Register;
