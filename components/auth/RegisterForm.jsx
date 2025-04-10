import { useState } from 'react';
import { TextInput, Button, Text, View } from 'react-native';
import { signUp } from '../../services/supabase.js';
import { useAuth } from './AuthContext.jsx';

const RegisterForm = ({ onRegister }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const { setSession } = useAuth();

    const handleRegister = async () => {
        const response = await signUp(name, email, password);
        if (!response.success) {
            setError(response.message);
        } else {
            setSession(response.user);
            onRegister(response.user);
            console.log('Registered user:', response.user);
        }
    };

    return (
        <View className='text-white py-14 px-8 border rounded-xl border-gray-700 w-4/5'>
            <TextInput
                placeholder='Name'
                placeholderTextColor={'white'}
                value={name}
                onChangeText={setName}
                keyboardType='default'
                className='w-full text-white my-2 p-2 mb-4 border-b-2 border-gray-400'
            />
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
            <Button title='Register' onPress={handleRegister} />
        </View>
    );
};

export default RegisterForm;
