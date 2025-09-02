import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider } from './context/ThemeContext.tsx';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
   <StrictMode>
      <ThemeProvider>
         <BrowserRouter>
            <App />
         </BrowserRouter>
      </ThemeProvider>
   </StrictMode>
);
