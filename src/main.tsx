import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { TonConnectUIProvider } from '@tonconnect/ui-react';
// import WebApp from '@twa-dev/sdk'

// this manifest is used temporarily for development purposes
const manifestUrl = 'https://dongbo0737.github.io/my-twa/tonconnect-manifest.json';
// WebApp.ready();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <TonConnectUIProvider manifestUrl={manifestUrl}>
    <App />
  </TonConnectUIProvider>,
)