import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
export default function login_register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    console.log('Logging in with', email, password);
    // Fetch user's todos from the server here
  };

  const handleRegister = () => {
    console.log('Registering with', email, password);
    // Register the user on the server here
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login or Register</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true}
        value={password}
        onChangeText={setPassword}
      />
      <button style={styles.button} onClick={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </button>
      <button style={styles.button} onClick={handleRegister}>
        <Text style={styles.buttonText}>Register</Text>
      </button>
      <button style={styles.button} onClick={()=>{window.open("/todo");}}>
        <Text style={styles.buttonText}>To-do</Text>
      </button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    width: '80%',
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
