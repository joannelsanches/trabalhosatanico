// hooks/useRecuperaSenha.ts
import { useState } from 'react';
import { auth } from '../firebase';
import { sendPasswordResetEmail } from 'firebase/auth';
import { Alert } from 'react-native';

export function useRecuperaSenha() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const resetPassword = async (email: string) => {
    if (!email) {
      Alert.alert('Atenção', 'Digite seu e-mail!');
      return false;
    }

    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await sendPasswordResetEmail(auth, email);
      setLoading(false);
      setSuccess(true);
      Alert.alert('Sucesso', 'E-mail de recuperação enviado! Verifique sua caixa de entrada.');
      return true;
    } catch (error: any) {
      setLoading(false);
      let mensagem = 'Erro ao enviar e-mail de recuperação.';
      
      if (error.code === 'auth/user-not-found') {
        mensagem = 'Usuário não encontrado.';
      } else if (error.code === 'auth/invalid-email') {
        mensagem = 'E-mail inválido.';
      }
      
      setError(mensagem);
      Alert.alert('Erro', mensagem);
      return false;
    }
  };

  return { resetPassword, loading, error, success };
}