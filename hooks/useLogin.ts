// hooks/useLogin.ts
import { useState } from 'react';
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Alert } from 'react-native';

export function useLogin() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (email: string, password: string) => {
    if (!email || !password) {
      Alert.alert('Atenção', 'Preencha todos os campos!');
      return null;
    }

    setLoading(true);
    setError(null);

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setLoading(false);
      return userCredential.user;
    } catch (error: any) {
      setLoading(false);
      let mensagem = 'Erro ao fazer login. Tente novamente.';
      
      if (error.code === 'auth/user-not-found') {
        mensagem = 'Usuário não encontrado.';
      } else if (error.code === 'auth/wrong-password') {
        mensagem = 'Senha incorreta.';
      } else if (error.code === 'auth/invalid-email') {
        mensagem = 'E-mail inválido.';
      } else if (error.code === 'auth/too-many-requests') {
        mensagem = 'Muitas tentativas. Tente novamente mais tarde.';
      }
      
      setError(mensagem);
      Alert.alert('Erro', mensagem);
      return null;
    }
  };

  return { login, loading, error };
}