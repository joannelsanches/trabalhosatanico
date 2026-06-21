import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Sobre() {
  const navigation = useNavigation();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>🏨</Text>
        <Text style={styles.title}>Alphinia Hotel</Text>
        <Text style={styles.version}>Versão 1.0.0</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>📱 Sobre o App</Text>
        <Text style={styles.cardText}>
          Este aplicativo foi desenvolvido para facilitar a gestão de reservas 
          do Hotel Alphinia, oferecendo uma experiência intuitiva e segura 
          para nossos hóspedes.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>🛠️ Tecnologias</Text>
        <Text style={styles.cardText}>
          • React Native {'\n'}
          • Firebase (Auth & Firestore){'\n'}
          • React Navigation{'\n'}
          • TypeScript{'\n'}
          • Expo Vector Icons
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>👨‍💻 Desenvolvedor</Text>
        <Text style={styles.cardText}>
          Criado com ❤️ por Marina{'\n'}
          © 2024 Todos os direitos reservados
        </Text>
      </View>

      <TouchableOpacity 
        style={styles.voltarButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.voltarText}>← Voltar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B1F3A',
  },
  header: {
    padding: 30,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#D4AF37',
  },
  logo: {
    fontSize: 80,
  },
  title: {
    color: '#D4AF37',
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 10,
  },
  version: {
    color: '#FFFFFF',
    fontSize: 14,
    marginTop: 5,
    opacity: 0.7,
  },
  card: {
    margin: 20,
    padding: 20,
    backgroundColor: '#132B4F',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#D4AF37',
  },
  cardTitle: {
    color: '#D4AF37',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  cardText: {
    color: '#FFFFFF',
    fontSize: 15,
    lineHeight: 26,
  },
  voltarButton: {
    margin: 20,
    backgroundColor: '#D4AF37',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
  },
  voltarText: {
    color: '#0B1F3A',
    fontSize: 16,
    fontWeight: 'bold',
  },
});