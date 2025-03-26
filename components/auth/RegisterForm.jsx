import { useState } from 'react';
import { TextInput, Button, Text } from 'react-native';
import { signUp } from '../../services/supabase.js';

export default function RegisterForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const handleRegister = async () => {
        try {
        const user = await signUp(email, password);
        console.log(user);
        } catch (error) {
        setError(error.message);
        }
    };
    return (
        <>
        <TextInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
        />
        <TextInput
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
        />
        {error ? <Text>{error}</Text> : null}
        <Button title="Register" onPress={handleRegister} />
        </>
    );
}
