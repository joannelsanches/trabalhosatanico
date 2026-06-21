// Screens/RecuperaSenha.tsx
import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useRecuperaSenha } from '../hooks/useRecuperaSenha';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';

type RecoverScreenProp = NativeStackNavigationProp<
  RootStackParamList,
  'RecuperaSenha'
>;

export default function RecuperaSenha() {
  const [email, setEmail] = useState('');
  const { resetPassword, loading, success } = useRecuperaSenha();
  const navigation = useNavigation<RecoverScreenProp>();

  const handleReset = async () => {
    const result = await resetPassword(email);
    if (result) {
      navigation.goBack();
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
        <Text style={styles.subtitle}>Recuperação de Senha</Text>
        <Text style={styles.description}>
          Informe o e-mail utilizado no sistema para receber o link de redefinição.
        </Text>

        <TextInput
          style={styles.input}
          placeholder="E-mail cadastrado"
          autoCapitalize="none"
          keyboardType="email-address"
          onChangeText={setEmail}
          value={email}
          placeholderTextColor="#999"
        />

        <TouchableOpacity 
          style={styles.enviarButton} 
          onPress={handleReset}
          disabled={loading || success}
        >
          <Text style={styles.buttonText}>
            {loading ? 'Enviando...' : 'Enviar Link de Recuperação'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.voltarButton} 
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.voltarText}>Voltar para o Login</Text>
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
    fontSize: 22,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 15,
  },
  description: {
    color: '#D9D9D9',
    textAlign: 'center',
    fontSize: 14,
    marginBottom: 30,
    lineHeight: 20,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 14,
    marginBottom: 20,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#D4AF37',
    color: '#000000',
  },
  enviarButton: {
    backgroundColor: '#D4AF37',
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  voltarButton: {
    backgroundColor: '#132B4F',
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D4AF37',
  },
  voltarText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});