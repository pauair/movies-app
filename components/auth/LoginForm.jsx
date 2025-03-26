import { useState } from "react";
import { Button, TextInput, Text } from "react-native";
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
        <Button title="Login" onPress={handleLogin} />
      </>
    );
  };
  
  export default LoginForm;
