import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { TooltipProvider } from '@/components/ui/tooltip';
import { App } from './components/App/App';
import './index.css';

const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
const applyColorScheme = () =>
  document.documentElement.classList.toggle('dark', prefersDark.matches);

applyColorScheme();
prefersDark.addEventListener('change', applyColorScheme);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <TooltipProvider>
      <App />
    </TooltipProvider>
  </StrictMode>,
);
