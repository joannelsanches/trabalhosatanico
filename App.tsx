import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text } from 'react-native';

import Login from './Screens/Login';
import Home from './Screens/Home';
import Register from './Screens/Register';
import RecuperaSenha from './Screens/RecuperaSenha';
import Quarto from './Screens/Quarto';
import ReservaForm from './Screens/ReservaForm';

// ========== TIPAGEM ==========
export type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  Register: undefined;
  RecuperaSenha: undefined;
  Quarto: { quartoId?: string };
  ReservaForm: { reserva?: any };
};

export type TabParamList = {
  Home: { showPerfil?: boolean; showOnlyReservas?: boolean } | undefined;
  Reservas: { showOnlyReservas?: boolean } | undefined;
  'Nova Reserva': undefined;
  Perfil: { showPerfil?: boolean } | undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<TabParamList>();

// ========== TABS ==========
function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let icon = '';

          if (route.name === 'Home') {
            icon = focused ? '🏠' : '🏠';
          } else if (route.name === 'Reservas') {
            icon = focused ? '📋' : '📋';
          } else if (route.name === 'Nova Reserva') {
            icon = focused ? '➕' : '➕';
          } else if (route.name === 'Perfil') {
            icon = focused ? '👤' : '👤';
          }

          return <Text style={{ fontSize: size, color }}>{icon}</Text>;
        },
        tabBarActiveTintColor: '#D4AF37',
        tabBarInactiveTintColor: '#FFFFFF',
        tabBarStyle: {
          backgroundColor: '#0B1F3A',
          borderTopColor: '#D4AF37',
          borderTopWidth: 1,
          paddingBottom: 5,
          paddingTop: 5,
          height: 65,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
        headerStyle: {
          backgroundColor: '#0B1F3A',
        },
        headerTitleStyle: {
          color: '#D4AF37',
          fontWeight: 'bold',
        },
        headerTintColor: '#D4AF37',
        headerTitleAlign: 'center',
      })}
    >
      <Tab.Screen 
        name="Home" 
        component={Home} 
        options={{ title: '🏠 Início' }}
      />
      <Tab.Screen 
        name="Reservas" 
        component={Home} 
        options={{ title: '📋 Reservas' }}
        initialParams={{ showOnlyReservas: true }}
      />
      <Tab.Screen 
        name="Nova Reserva" 
        component={ReservaForm} 
        options={{ title: '✏️ Nova Reserva' }}
      />
      <Tab.Screen 
        name="Perfil" 
        component={Home} 
        options={{ title: '👤 Perfil' }}
        initialParams={{ showPerfil: true }}
      />
    </Tab.Navigator>
  );
}

// ========== APP ==========
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen 
          name="Login" 
          component={Login} 
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="Register" 
          component={Register} 
          options={{ title: 'Cadastro' }}
        />
        <Stack.Screen 
          name="RecuperaSenha" 
          component={RecuperaSenha} 
          options={{ title: 'Recuperar Senha' }}
        />
        <Stack.Screen 
          name="Home" 
          component={TabNavigator} 
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="Quarto" 
          component={Quarto} 
          options={{ title: 'Detalhes do Quarto' }}
        />
        <Stack.Screen 
          name="ReservaForm" 
          component={ReservaForm} 
          options={{ title: 'Nova Reserva' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}