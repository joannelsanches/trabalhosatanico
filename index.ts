import { registerRootComponent } from 'expo';

// ADICIONE ESSA LINHA NO TOPO (Ajuste o caminho para o seu arquivo do Firebase)
import './firebase'; 

import App from './App';

registerRootComponent(App);