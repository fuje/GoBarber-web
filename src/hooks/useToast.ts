import { useContext } from 'react';
import { ToastContext } from '../contexts/ToastContext';

export default function useToast() {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error('useToast must be used within an ToastProvider');
  }

  return context;
}
