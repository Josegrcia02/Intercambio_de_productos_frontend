import { BrowserRouter } from 'react-router-dom';
import AppRouter from './routes/AppRouter';
import './App.css';

function App() {
  return (
    // BrowserRouter debe envolver toda la aplicación
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  );
}

export default App;