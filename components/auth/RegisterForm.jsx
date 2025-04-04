import { useState } from 'react';
import { TextInput, Button, Text, View } from 'react-native';
import { signUp } from '../../services/supabase.js';

export default function RegisterForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const handleRegister = async () => {
        try {
        const user = await signUp(name, email, password);
        console.log(user);
        } catch (error) {
        setError(error.message);
        }
    };
    return (
        <View className='text-white py-14 px-8 border rounded-xl border-gray-700 w-4/5'>
        <TextInput
            placeholder="Name"
            placeholderTextColor={'white'}
            value={name}
            onChangeText={setName}
            keyboardType="default"
            className="w-full text-white my-2 p-2 mb-4 border-b-2 border-gray-400"
        />
        <TextInput
            placeholder="Email"
            placeholderTextColor={'white'}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            className="w-full text-white my-2 p-2 mb-4 border-b-2 border-gray-400"
        />
        <TextInput
            placeholder="Password"
            placeholderTextColor={'white'}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            className="w-full text-white my-2 p-2 mb-12 border-b-2 border-gray-400"
        />
        {error ? <Text>{error}</Text> : null}
        <Button title="Register" onPress={handleRegister} />
        </View>
    );
}
