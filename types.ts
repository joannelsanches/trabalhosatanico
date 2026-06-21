import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  Register: undefined;
  RecuperaSenha: undefined;
  Quarto: { quartoId?: string };
  ReservaForm: { reserva?: any };
};

export type NavigationProps = NativeStackNavigationProp<RootStackParamList>;