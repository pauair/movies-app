import { useState } from "react";
import { Button, TextInput, Text, View } from "react-native";
import { signIn } from "../../services/supabase.js"

const LoginForm = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
  
    const handleLogin = async () => {
      try {
        const user = await signIn(email, password);
        onLogin(user); // Pass the user to the parent component
      } catch (error) {
        setError(error.message);
      }
    };
  
    return (
      <View className='text-white py-14 px-8 border rounded-xl border-gray-700 w-4/5'>
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
        {error ? <Text className='text-red-600 text-center p-4'>{error}</Text> : null}
        <Button title="Login" onPress={handleLogin} />
      </View>
    );
  };
  
  export default LoginForm;
