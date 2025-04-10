import { View, Text, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import RegisterForm from './RegisterForm';

const Register = () => {
    const router = useRouter();

    const handleRegister = ({ user }) => {
        console.log('Registered user:', user);
        router.replace('/movies');
    };

    return (
        <View className='bg-black h-full items-center'>
            <Text className='text-white font-bold text-xl my-16'>
                Create an account
            </Text>
            <RegisterForm onRegister={handleRegister} />
            <Pressable onPress={() => router.replace('/login')}>
                <Text className='text-white mt-8 text-base'>
                    Already have an account? Login
                </Text>
            </Pressable>
        </View>
    );
};

export default Register;
