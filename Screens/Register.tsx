// Screens/Register.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Alert,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { useRegister } from '../hooks/useRegister';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';

type Props = NativeStackNavigationProp<RootStackParamList, 'Register'>;

export default function Register() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const { register, loading } = useRegister();
  const navigation = useNavigation<Props>();

  const handleRegister = async () => {
    const user = await register(nome, email, senha, confirmarSenha);
    if (user) {
      navigation.replace('Home');
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          <Text style={styles.logo}>🏨</Text>
          <Text style={styles.title}>Alphinia Hotel</Text>
          <Text style={styles.subtitle}>Crie sua conta</Text>

          <Text style={styles.label}>Nome Completo</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite seu nome"
            value={nome}
            onChangeText={setNome}
            placeholderTextColor="#999"
          />

          <Text style={styles.label}>E-mail</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite seu e-mail"
            value={email}
            onChangeText={setEmail}
            placeholderTextColor="#999"
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <Text style={styles.label}>Senha</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite sua senha (mínimo 6 caracteres)"
            value={senha}
            onChangeText={setSenha}
            secureTextEntry
            placeholderTextColor="#999"
          />

          <Text style={styles.label}>Confirmar Senha</Text>
          <TextInput
            style={styles.input}
            placeholder="Confirme sua senha"
            value={confirmarSenha}
            onChangeText={setConfirmarSenha}
            secureTextEntry
            placeholderTextColor="#999"
          />

          <TouchableOpacity 
            style={styles.cadastrarButton} 
            onPress={handleRegister}
            disabled={loading}
          >
            <Text style={styles.buttonText}>
              {loading ? 'Criando conta...' : 'Criar Conta'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.voltarButton} 
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.voltarText}>Já tem uma conta? Faça login</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B1F3A',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  content: {
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
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 5,
    marginBottom: 25,
    opacity: 0.8,
  },
  label: {
    color: '#D4AF37',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 6,
    marginTop: 5,
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
  cadastrarButton: {
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
  voltarButton: {
    backgroundColor: 'transparent',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  voltarText: {
    color: '#D4AF37',
    fontSize: 14,
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
});