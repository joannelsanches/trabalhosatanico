// hooks/useHome.ts
import { useState, useEffect } from 'react';
import { auth, db } from '../firebase';
import { collection, onSnapshot, query, where, deleteDoc, doc } from 'firebase/firestore';
import { Alert } from 'react-native';

export function useHome() {
  const [reservas, setReservas] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  // Buscar reservas
  useEffect(() => {
    if (!auth.currentUser) {
      setLoading(false);
      return;
    }

    const q = query(
      collection(db, 'reservas'),
      where('userId', '==', auth.currentUser.uid)
    );

    const unsubscribe = onSnapshot(q, 
      (snapshot) => {
        const reservasList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setReservas(reservasList);
        setLoading(false);
      },
      (error) => {
        console.error('Erro ao buscar reservas:', error);
        Alert.alert('Erro', 'Não foi possível carregar as reservas');
        setLoading(false);
      }
    );

    return unsubscribe;
  }, []);

  // Deletar reserva
  const deleteReserva = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'reservas', id));
      setModalVisible(false);
      Alert.alert('Sucesso', 'Reserva excluída com sucesso!');
      return true;
    } catch (error) {
      console.error('Erro ao excluir:', error);
      Alert.alert('Erro', 'Não foi possível excluir a reserva');
      return false;
    }
  };

  // Confirmar exclusão
  const confirmDelete = (id: string) => {
    setSelectedId(id);
    setModalVisible(true);
  };

  // Cancelar exclusão
  const cancelDelete = () => {
    setSelectedId(null);
    setModalVisible(false);
  };

  return {
    reservas,
    loading,
    selectedId,
    modalVisible,
    deleteReserva,
    confirmDelete,
    cancelDelete,
    setModalVisible,
  };
}