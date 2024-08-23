import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './styles/styles.css'
import './styles/tailwind.css'
import { ChakraProvider } from '@chakra-ui/react';
import '@fortawesome/fontawesome-svg-core/styles.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider>
      <App />
    </ChakraProvider>
  </React.StrictMode>,
)
window.oncontextmenu = (evt) => { evt.preventDefault(); return false; }