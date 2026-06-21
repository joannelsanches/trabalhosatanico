// Screens/Home.tsx
import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Alert,
  Image,
} from 'react-native';
import { useHome } from '../hooks/useHome';
import { useAuth } from '../hooks/useAuth';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigation } from '@react-navigation/native';

export default function Home() {
  const navigation = useNavigation<any>();
  const { user } = useAuth();
  const {
    reservas,
    loading,
    selectedId,
    modalVisible,
    deleteReserva,
    confirmDelete,
    cancelDelete,
    setModalVisible,
  } = useHome();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigation.replace('Login');
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível sair da conta');
    }
  };

  const getImagemQuarto = (tipoQuarto: string) => {
    switch (tipoQuarto) {
      case 'Standard':
        return require('../assets/standard-room.jpeg');
      case 'Luxo':
        return require('../assets/luxo-room.jpeg');
      case 'Master':
        return require('../assets/master-room.jpeg');
      default:
        return null;
    }
  };

  const formatarData = (data: string) => {
    if (!data) return 'Não informado';
    try {
      if (data.includes('T')) {
        return new Date(data).toLocaleDateString('pt-BR');
      }
      return data;
    } catch {
      return data;
    }
  };

  // Verifica se usuário está logado
  if (!user) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>🏨 Alphinia Hotel</Text>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Usuário não logado</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🏨 Alphinia Hotel</Text>

      <TouchableOpacity
        style={styles.novoButton}
        onPress={() => navigation.navigate('ReservaForm')}
      >
        <Text style={styles.buttonText}>➕ Nova Reserva</Text>
      </TouchableOpacity>

      {loading ? (
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Carregando reservas...</Text>
        </View>
      ) : reservas.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Nenhuma reserva encontrada</Text>
          <Text style={styles.emptySubText}>
            Clique em "Nova Reserva" para fazer sua primeira reserva!
          </Text>
        </View>
      ) : (
        <FlatList
          data={reservas}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
          renderItem={({ item }) => (
            <View style={styles.item}>
              {item.tipoQuarto && (
                <Image
                  source={getImagemQuarto(item.tipoQuarto)}
                  style={styles.imagemQuarto}
                  resizeMode="cover"
                />
              )}

              <View style={styles.infoContainer}>
                <Text style={styles.hospede}>
                  {item.nomeHospede || 'Hóspede'}
                </Text>

                <Text style={styles.info}>
                  🛏️ Quarto: {item.quarto || 'Não informado'}
                </Text>

                <Text style={styles.info}>
                  🏷️ Tipo: {item.tipoQuarto || 'Não definido'}
                </Text>

                <Text style={styles.info}>
                  📅 Check-in: {formatarData(item.checkIn)}
                </Text>

                <Text style={styles.info}>
                  📅 Check-out: {formatarData(item.checkOut)}
                </Text>

                {item.fotoPerfil && (
                  <Image 
                    source={{ uri: item.fotoPerfil }} 
                    style={styles.fotoPerfilMini}
                  />
                )}
              </View>

              <View style={styles.actions}>
                <TouchableOpacity
                  style={styles.editButton}
                  onPress={() => {
                    navigation.navigate('ReservaForm', {
                      reserva: item,
                    });
                  }}
                >
                  <Text style={styles.actionText}>✏️</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => confirmDelete(item.id)}
                >
                  <Text style={styles.actionText}>🗑️</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      )}

      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={cancelDelete}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalEmoji}>⚠️</Text>
            <Text style={styles.modalText}>
              Deseja excluir esta reserva?
            </Text>
            <Text style={styles.modalSubText}>
              Esta ação não pode ser desfeita.
            </Text>

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.modalButtonNao}
                onPress={cancelDelete}
              >
                <Text style={styles.modalButtonText}>Cancelar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.modalButtonSim}
                onPress={() => selectedId && deleteReserva(selectedId)}
              >
                <Text style={styles.modalButtonText}>Excluir</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <TouchableOpacity
        style={styles.sairButton}
        onPress={handleLogout}
      >
        <Text style={styles.sairButtonText}>🚪 Sair</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A192F',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  novoButton: {
    backgroundColor: '#D4AF37',
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#D4AF37',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  listContainer: {
    paddingBottom: 20,
  },
  item: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 15,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  imagemQuarto: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 12,
  },
  infoContainer: {
    flex: 1,
  },
  hospede: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0A192F',
    marginBottom: 4,
  },
  info: {
    fontSize: 13,
    color: '#555',
    marginBottom: 2,
  },
  fotoPerfilMini: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginTop: 4,
    borderWidth: 1,
    borderColor: '#D4AF37',
  },
  actions: {
    justifyContent: 'center',
    gap: 8,
  },
  editButton: {
    backgroundColor: '#D4AF37',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#D4AF37',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  deleteButton: {
    backgroundColor: '#D32F2F',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#D32F2F',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  actionText: {
    fontSize: 18,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  emptyText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  emptySubText: {
    color: '#888',
    fontSize: 14,
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#FFF',
    padding: 25,
    borderRadius: 20,
    width: '85%',
    alignItems: 'center',
  },
  modalEmoji: {
    fontSize: 40,
    marginBottom: 10,
  },
  modalText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0A192F',
    marginBottom: 8,
  },
  modalSubText: {
    fontSize: 14,
    color: '#888',
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    gap: 12,
    width: '100%',
    justifyContent: 'center',
  },
  modalButtonSim: {
    backgroundColor: '#D32F2F',
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 25,
    flex: 1,
    alignItems: 'center',
  },
  modalButtonNao: {
    backgroundColor: '#D4AF37',
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 25,
    flex: 1,
    alignItems: 'center',
  },
  modalButtonText: {
    color: '#FFF',
    fontWeight: '600',
    fontSize: 16,
  },
  sairButton: {
    backgroundColor: '#D32F2F',
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 10,
    shadowColor: '#D32F2F',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  sairButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});