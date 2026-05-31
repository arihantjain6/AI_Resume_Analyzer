import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './app.routes';
import { AuthProvider } from './features/auth/services/auth.context';
import { ThemeProvider } from './components/theme/ThemeProvider';

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
