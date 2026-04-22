import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface LoginFormProps {
  onLogin: () => void;
  isLoading?: boolean;
}

export const LoginForm = ({ onLogin, isLoading }: LoginFormProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo</Text>
      <TouchableOpacity
        onPress={onLogin}
        disabled={isLoading}
        testID="login-button"
        style={[styles.button, isLoading && styles.disabled]}
      >
        <Text style={styles.buttonText}>{isLoading ? 'Carregando...' : 'Entrar'}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
  disabled: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
});
