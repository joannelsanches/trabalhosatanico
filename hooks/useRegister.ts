// hooks/useRegister.ts
import { useState } from 'react';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { Alert } from 'react-native';

export function useRegister() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const register = async (nome: string, email: string, password: string, confirmPassword: string) => {
    // Validações
    if (!nome || !email || !password || !confirmPassword) {
      Alert.alert('Atenção', 'Preencha todos os campos!');
      return null;
    }

    if (password !== confirmPassword) {
      Alert.alert('Atenção', 'As senhas não coincidem!');
      return null;
    }

    if (password.length < 6) {
      Alert.alert('Atenção', 'A senha deve ter pelo menos 6 caracteres!');
      return null;
    }

    setLoading(true);
    setError(null);

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // Atualiza o perfil com o nome
      await updateProfile(userCredential.user, {
        displayName: nome,
      });

      setLoading(false);
      Alert.alert('Sucesso', 'Conta criada com sucesso!');
      return userCredential.user;
    } catch (error: any) {
      setLoading(false);
      let mensagem = 'Erro ao criar conta. Tente novamente.';
      
      if (error.code === 'auth/email-already-in-use') {
        mensagem = 'Este e-mail já está em uso.';
      } else if (error.code === 'auth/invalid-email') {
        mensagem = 'E-mail inválido.';
      } else if (error.code === 'auth/weak-password') {
        mensagem = 'A senha deve ter pelo menos 6 caracteres.';
      } else if (error.code === 'auth/operation-not-allowed') {
        mensagem = 'Cadastro não permitido no momento.';
      }
      
      setError(mensagem);
      Alert.alert('Erro', mensagem);
      return null;
    }
  };

  return { register, loading, error };
}