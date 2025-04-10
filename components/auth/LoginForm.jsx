import { useState } from 'react';
import { Button, TextInput, Text, View } from 'react-native';
import { signIn } from '../../services/supabase.js';
import { useAuth } from './AuthContext.jsx';

const LoginForm = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { setSession } = useAuth();

    const handleLogin = async () => {
        const response = await signIn(email, password);
        if (!response.success) {
            setError(response.message);
        } else {
            onLogin(response.user);
            setSession(response.user);
            console.log('Registered user:', response.user);
        }
    };

    return (
        <View className='text-white py-14 px-8 border rounded-xl border-gray-700 w-4/5'>
            <TextInput
                placeholder='Email'
                placeholderTextColor={'white'}
                value={email}
                onChangeText={setEmail}
                keyboardType='email-address'
                className='w-full text-white my-2 p-2 mb-4 border-b-2 border-gray-400'
            />
            <TextInput
                placeholder='Password'
                placeholderTextColor={'white'}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                className='w-full text-white my-2 p-2 mb-12 border-b-2 border-gray-400'
            />
            {error ? (
                <Text className='text-red-600 text-center p-4'>{error}</Text>
            ) : null}
            <Button title='Login' onPress={handleLogin} />
        </View>
    );
};

export default LoginForm;
