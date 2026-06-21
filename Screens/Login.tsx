// Screens/Login.tsx
import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Alert,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useLogin } from '../hooks/useLogin';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';

type Props = NativeStackNavigationProp<RootStackParamList, 'Login'>;

export default function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const { login, loading } = useLogin();
  const navigation = useNavigation<Props>();

  const handleLogin = async () => {
    const user = await login(email, senha);
    if (user) {
      navigation.replace('Home');
    }
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.content}>
        <Text style={styles.logo}>🏨</Text>
        <Text style={styles.title}>Alphinia Hotel</Text>
        <Text style={styles.subtitle}>Sistema de Gerenciamento Hoteleiro</Text>

        <TextInput
          style={styles.input}
          placeholder="E-mail"
          value={email}
          onChangeText={setEmail}
          placeholderTextColor="#999"
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TextInput
          style={styles.input}
          placeholder="Senha"
          secureTextEntry
          value={senha}
          onChangeText={setSenha}
          placeholderTextColor="#999"
        />

        <TouchableOpacity 
          style={styles.entrarButton} 
          onPress={handleLogin}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? 'Entrando...' : 'Entrar'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.criarButton} 
          onPress={() => navigation.navigate('Register')}
        >
          <Text style={styles.buttonText}>Criar Conta</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.esqueceuButton} 
          onPress={() => navigation.navigate('RecuperaSenha')}
        >
          <Text style={styles.esqueceuText}>Esqueceu sua senha?</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B1F3A',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    padding: 25,
  },
  logo: {
    fontSize: 60,
    textAlign: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 34,
    fontWeight: 'bold',
    color: '#D4AF37',
    textAlign: 'center',
  },
  subtitle: {
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 40,
    fontSize: 15,
    opacity: 0.8,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 14,
    marginBottom: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#D4AF37',
    color: '#000000',
  },
  entrarButton: {
    backgroundColor: '#D4AF37',
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 15,
    shadowColor: '#D4AF37',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  criarButton: {
    backgroundColor: '#132B4F',
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D4AF37',
    marginBottom: 15,
  },
  esqueceuButton: {
    alignItems: 'center',
    marginTop: 5,
  },
  esqueceuText: {
    color: '#D4AF37',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});