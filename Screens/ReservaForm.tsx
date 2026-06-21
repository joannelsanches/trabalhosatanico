// Screens/ReservaForm.tsx
import React from 'react';
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  ActivityIndicator,
} from 'react-native';
import { useReservaForm } from '../hooks/useReservaForm';

export default function ReservaForm({ route, navigation }: any) {
  const reserva = route.params?.reserva;
  const hook = useReservaForm(reserva);

  const handleSalvar = async () => {
    const ok = await hook.salvarReserva();
    if (ok) navigation.goBack();
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.logo}>🏨</Text>
      <Text style={styles.title}>
        {reserva ? 'Editar Reserva' : 'Nova Reserva'}
      </Text>

      {/* FOTO */}
      <Text style={styles.label}>📸 Foto do Hóspede</Text>
      <View style={styles.fotoContainer}>
        {hook.fotoPerfil ? (
          <Image source={{ uri: hook.fotoPerfil }} style={styles.fotoPerfil} />
        ) : (
          <View style={styles.fotoPlaceholder}>
            <Text style={styles.fotoPlaceholderText}>👤</Text>
          </View>
        )}

        <View style={styles.fotoButtons}>
          <TouchableOpacity style={styles.fotoButton} onPress={hook.tirarFoto}>
            <Text style={styles.fotoButtonText}>📷 Câmera</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.fotoButton} onPress={hook.selecionarImagem}>
            <Text style={styles.fotoButtonText}>🖼️ Galeria</Text>
          </TouchableOpacity>
          {hook.fotoPerfil && (
            <TouchableOpacity
              style={[styles.fotoButton, styles.fotoButtonRemover]}
              onPress={() => hook.setFotoPerfil(null)}
            >
              <Text style={styles.fotoButtonText}>🗑️</Text>
            </TouchableOpacity>
          )}
        </View>

        {hook.uploading && (
          <View style={styles.uploadingContainer}>
            <ActivityIndicator size="small" color="#D4AF37" />
            <Text style={styles.uploadingText}>Enviando...</Text>
          </View>
        )}
      </View>

      <Text style={styles.label}>Nome do Hóspede</Text>
      <TextInput
        style={styles.input}
        value={hook.nomeHospede}
        onChangeText={hook.setNomeHospede}
        placeholder="Digite o nome"
        placeholderTextColor="#999"
      />

      <Text style={styles.label}>CPF</Text>
      <TextInput
        style={styles.input}
        value={hook.cpf}
        onChangeText={hook.setCpf}
        placeholder="000.000.000-00"
        placeholderTextColor="#999"
        keyboardType="numeric"
      />

      <Text style={styles.label}>Número do Quarto</Text>
      <TextInput
        style={styles.input}
        value={hook.quarto}
        onChangeText={hook.setQuarto}
        placeholder="Ex: 101"
        placeholderTextColor="#999"
      />

      <Text style={styles.label}>Tipo do Quarto</Text>
      <View style={styles.tipoContainer}>
        {['Standard', 'Luxo', 'Master'].map((tipo) => (
          <TouchableOpacity
            key={tipo}
            style={[
              styles.tipoButton,
              hook.tipoQuarto === tipo && styles.tipoButtonActive,
            ]}
            onPress={() => hook.setTipoQuarto(tipo)}
          >
            <Text
              style={[
                styles.tipoText,
                hook.tipoQuarto === tipo && styles.tipoTextActive,
              ]}
            >
              {tipo}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.label}>Check-in</Text>
      <TextInput
        style={styles.input}
        value={hook.checkIn}
        onChangeText={hook.setCheckIn}
        placeholder="DD/MM/AAAA"
        placeholderTextColor="#999"
      />

      <Text style={styles.label}>Check-out</Text>
      <TextInput
        style={styles.input}
        value={hook.checkOut}
        onChangeText={hook.setCheckOut}
        placeholder="DD/MM/AAAA"
        placeholderTextColor="#999"
      />

      <TouchableOpacity
        style={styles.salvarButton}
        onPress={handleSalvar}
        disabled={hook.loading || hook.uploading}
      >
        <Text style={styles.buttonText}>
          {hook.loading || hook.uploading ? 'Salvando...' : 'Salvar Reserva'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.cancelarButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.cancelarText}>Cancelar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B1F3A',
    padding: 20,
  },
  logo: {
    fontSize: 60,
    textAlign: 'center',
    marginTop: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#D4AF37',
    textAlign: 'center',
    marginBottom: 30,
  },
  label: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    marginTop: 15,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
    color: '#000',
    borderWidth: 1,
    borderColor: '#D4AF37',
  },
  tipoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
    marginVertical: 10,
  },
  tipoButton: {
    flex: 1,
    backgroundColor: '#132B4F',
    paddingVertical: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#D4AF37',
    alignItems: 'center',
  },
  tipoButtonActive: {
    backgroundColor: '#D4AF37',
  },
  tipoText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  tipoTextActive: {
    color: '#0B1F3A',
  },
  salvarButton: {
    backgroundColor: '#D4AF37',
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 10,
  },
  cancelarButton: {
    backgroundColor: '#132B4F',
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 30,
    borderWidth: 1,
    borderColor: '#D4AF37',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cancelarText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  fotoContainer: {
    backgroundColor: '#132B4F',
    borderRadius: 12,
    padding: 15,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D4AF37',
    marginBottom: 5,
  },
  fotoPerfil: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: '#D4AF37',
    marginBottom: 10,
  },
  fotoPlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#1A3A5C',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#D4AF37',
    marginBottom: 10,
  },
  fotoPlaceholderText: {
    fontSize: 40,
    color: '#D4AF37',
  },
  fotoButtons: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 5,
  },
  fotoButton: {
    backgroundColor: '#D4AF37',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    alignItems: 'center',
  },
  fotoButtonRemover: {
    backgroundColor: '#D32F2F',
  },
  fotoButtonText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '600',
  },
  uploadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    gap: 10,
  },
  uploadingText: {
    color: '#D4AF37',
    fontSize: 14,
  },
});