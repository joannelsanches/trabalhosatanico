import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";

import { addDoc, collection, updateDoc, doc } from "firebase/firestore";
import { db, auth } from "../firebase";

export default function ReservaForm({ route, navigation }: any) {
  const reserva = route.params?.reserva;

  const [nomeHospede, setNomeHospede] = useState(
    reserva?.nomeHospede || ""
  );
  const [cpf, setCpf] = useState(reserva?.cpf || "");
  const [quarto, setQuarto] = useState(reserva?.quarto || "");
  const [checkIn, setCheckIn] = useState(reserva?.checkIn || "");
  const [checkOut, setCheckOut] = useState(reserva?.checkOut || "");

  const salvar = async () => {
    const dadosReserva = {
      nomeHospede,
      cpf,
      quarto,
      checkIn,
      checkOut,
      userId: auth.currentUser?.uid,
    };

    if (reserva) {
      await updateDoc(doc(db, "reservas", reserva.id), dadosReserva);
    } else {
      await addDoc(collection(db, "reservas"), dadosReserva);
    }

    navigation.goBack();
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.logo}>🏨</Text>

      <Text style={styles.title}>
        {reserva ? "Editar Reserva" : "Nova Reserva"}
      </Text>

      <Text style={styles.label}>Nome do Hóspede</Text>
      <TextInput
        style={styles.input}
        value={nomeHospede}
        onChangeText={setNomeHospede}
        placeholder="Digite o nome do hóspede"
        placeholderTextColor="#999"
      />

      <Text style={styles.label}>CPF</Text>
      <TextInput
        style={styles.input}
        value={cpf}
        onChangeText={setCpf}
        placeholder="000.000.000-00"
        placeholderTextColor="#999"
        keyboardType="numeric"
      />

      <Text style={styles.label}>Número do Quarto</Text>
      <TextInput
        style={styles.input}
        value={quarto}
        onChangeText={setQuarto}
        placeholder="Ex: 101"
        placeholderTextColor="#999"
      />

      <Text style={styles.label}>Check-in</Text>
      <TextInput
        style={styles.input}
        value={checkIn}
        onChangeText={setCheckIn}
        placeholder="Ex: 20/06/2026"
        placeholderTextColor="#999"
      />

      <Text style={styles.label}>Check-out</Text>
      <TextInput
        style={styles.input}
        value={checkOut}
        onChangeText={setCheckOut}
        placeholder="Ex: 25/06/2026"
        placeholderTextColor="#999"
      />

      <TouchableOpacity
        style={styles.salvarButton}
        onPress={salvar}
      >
        <Text style={styles.buttonText}>Salvar Reserva</Text>
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
    backgroundColor: "#0B1F3A",
    padding: 20,
  },

  logo: {
    fontSize: 60,
    textAlign: "center",
    marginTop: 20,
  },

  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#D4AF37",
    textAlign: "center",
    marginBottom: 30,
  },

  label: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
    marginTop: 15,
  },

  input: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
    color: "#000",
    borderWidth: 1,
    borderColor: "#D4AF37",
  },

  salvarButton: {
    backgroundColor: "#D4AF37",
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 30,
    marginBottom: 10,
  },

  cancelarButton: {
    backgroundColor: "#132B4F",
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 30,
    borderWidth: 1,
    borderColor: "#D4AF37",
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },

  cancelarText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
});