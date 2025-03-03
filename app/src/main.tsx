import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux'; // Redux store provider
import { store } from './redux/store'; // Redux store
import { AuthProvider } from './context/AuthProvider'; // AuthContext provider

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>  {/* Redux provider */}
      <AuthProvider>           {/* Auth context provider */}
        <App />
      </AuthProvider>
    </Provider>
  </StrictMode>
);
