// hooks/useReservaForm.ts
import { useState, useEffect } from 'react';
import { Alert, Platform } from 'react-native';
import { auth, db, storage } from '../firebase';
import { addDoc, collection, updateDoc, doc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import * as ImagePicker from 'expo-image-picker';

export function useReservaForm(reserva?: any) {
  const [nomeHospede, setNomeHospede] = useState(reserva?.nomeHospede || '');
  const [cpf, setCpf] = useState(reserva?.cpf || '');
  const [quarto, setQuarto] = useState(reserva?.quarto || '');
  const [tipoQuarto, setTipoQuarto] = useState(reserva?.tipoQuarto || '');
  const [fotoPerfil, setFotoPerfil] = useState(reserva?.fotoPerfil || null);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [checkIn, setCheckIn] = useState(reserva?.checkIn || '');
  const [checkOut, setCheckOut] = useState(reserva?.checkOut || '');

  const selecionarImagem = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permissão necessária', 'Precisamos de acesso à galeria.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });

    if (!result.canceled && result.assets[0]) {
      setFotoPerfil(result.assets[0].uri);
    }
  };

  const tirarFoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permissão necessária', 'Precisamos de acesso à câmera.');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });

    if (!result.canceled && result.assets[0]) {
      setFotoPerfil(result.assets[0].uri);
    }
  };

  const uploadImagem = async (uri: string) => {
    setUploading(true);
    const response = await fetch(uri);
    const blob = await response.blob();
    const filename = `fotos/${auth.currentUser?.uid}_${Date.now()}.jpg`;
    const storageRef = ref(storage, filename);
    await uploadBytes(storageRef, blob);
    const url = await getDownloadURL(storageRef);
    setUploading(false);
    return url;
  };

  const salvarReserva = async () => {
    if (!auth.currentUser) {
      Alert.alert('Atenção', 'Você precisa estar logado!');
      return false;
    }

    if (!nomeHospede || !cpf || !quarto || !tipoQuarto) {
      Alert.alert('Atenção', 'Preencha todos os campos!');
      return false;
    }

    if (!fotoPerfil) {
      Alert.alert('Atenção', 'Adicione uma foto!');
      return false;
    }

    setLoading(true);

    try {
      let fotoURL = fotoPerfil;
      if (fotoPerfil.startsWith('file://')) {
        fotoURL = await uploadImagem(fotoPerfil);
      }

      const dados = {
        nomeHospede,
        cpf,
        quarto,
        tipoQuarto,
        checkIn,
        checkOut,
        fotoPerfil: fotoURL,
        userId: auth.currentUser.uid,
        updatedAt: new Date().toISOString(),
      };

      if (reserva) {
        await updateDoc(doc(db, 'reservas', reserva.id), dados);
      } else {
        await addDoc(collection(db, 'reservas'), {
          ...dados,
          createdAt: new Date().toISOString(),
        });
      }

      setLoading(false);
      Alert.alert('Sucesso', 'Reserva salva!');
      return true;
    } catch (error: any) {
      setLoading(false);
      Alert.alert('Erro', error.message);
      return false;
    }
  };

  return {
    nomeHospede,
    setNomeHospede,
    cpf,
    setCpf,
    quarto,
    setQuarto,
    tipoQuarto,
    setTipoQuarto,
    fotoPerfil,
    setFotoPerfil,
    checkIn,
    setCheckIn,
    checkOut,
    setCheckOut,
    loading,
    uploading,
    selecionarImagem,
    tirarFoto,
    salvarReserva,
  };
}