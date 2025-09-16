// src/components/Newsletter.tsx
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Send, CheckCircle, AlertCircle, X } from 'lucide-react';
import { apiClient } from '@/lib/api';

interface NewsletterProps {
  variant?: 'footer' | 'modal' | 'inline';
  onClose?: () => void;
}

export default function Newsletter({ variant = 'footer', onClose }: NewsletterProps) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      setErrorMessage('Por favor ingresa tu email');
      setStatus('error');
      return;
    }

    // Validación básica de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMessage('Por favor ingresa un email válido');
      setStatus('error');
      return;
    }

    try {
      setLoading(true);
      setStatus('idle');
      setErrorMessage('');

      console.log('📧 Enviando suscripción:', { email, name });
      
      const success = await apiClient.subscribeNewsletter(email.trim(), name.trim() || undefined);
      
      if (success) {
        setStatus('success');
        setEmail('');
        setName('');
        
        // Auto-hide success message after 5 seconds
        setTimeout(() => {
          setStatus('idle');
          if (onClose) onClose();
        }, 5000);
      } else {
        setStatus('error');
        setErrorMessage('Error al suscribirse. Por favor intenta nuevamente.');
      }
    } catch (error) {
      console.error('Newsletter subscription error:', error);
      setStatus('error');
      setErrorMessage('Error de conexión. Verifica tu internet e intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  const resetStatus = () => {
    setStatus('idle');
    setErrorMessage('');
  };

  // Variante Modal
  if (variant === 'modal') {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white rounded-2xl p-8 w-full max-w-md shadow-2xl relative"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          {onClose && (
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X size={24} />
            </button>
          )}

          {/* Header */}
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-slo-purple-600 to-slo-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="text-white" size={24} />
            </div>
            <h3 className="text-2xl font-bold gradient-text mb-2">¡Mantente Informado!</h3>
            <p className="text-gray-600">Recibe las últimas noticias de San Luis directamente en tu email</p>
          </div>

          <NewsletterForm 
            email={email}
            name={name}
            loading={loading}
            status={status}
            errorMessage={errorMessage}
            onEmailChange={setEmail}
            onNameChange={setName}
            onSubmit={handleSubmit}
            onResetStatus={resetStatus}
            showName={true}
          />
        </motion.div>
      </motion.div>
    );
  }

  // Variante Inline
  if (variant === 'inline') {
    return (
      <div className="bg-gradient-to-r from-slo-purple-600 to-slo-orange-500 rounded-2xl p-8 text-white">
        <div className="max-w-2xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Mail size={32} />
            <h3 className="text-2xl font-bold">Newsletter San Luis Opina</h3>
          </div>
          <p className="text-lg mb-6 opacity-90">
            Entérate de todo lo que pasa en San Luis. Noticias, eventos y más.
          </p>
          
          <NewsletterForm 
            email={email}
            name={name}
            loading={loading}
            status={status}
            errorMessage={errorMessage}
            onEmailChange={setEmail}
            onNameChange={setName}
            onSubmit={handleSubmit}
            onResetStatus={resetStatus}
            showName={true}
            theme="dark"
          />
        </div>
      </div>
    );
  }

  // Variante Footer (default)
  return (
    <div className="bg-gradient-to-r from-slo-purple-600 to-slo-orange-500 py-12">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h3 className="text-2xl font-bold mb-4 text-white">Mantente Informado</h3>
          <p className="text-lg mb-8 opacity-90 text-white">
            Recibe las últimas noticias de San Luis directamente en tu email
          </p>
          
          <NewsletterForm 
            email={email}
            name={name}
            loading={loading}
            status={status}
            errorMessage={errorMessage}
            onEmailChange={setEmail}
            onNameChange={setName}
            onSubmit={handleSubmit}
            onResetStatus={resetStatus}
            showName={false}
            theme="dark"
          />
        </motion.div>
      </div>
    </div>
  );
}

// Componente del formulario reutilizable
interface NewsletterFormProps {
  email: string;
  name: string;
  loading: boolean;
  status: 'idle' | 'success' | 'error';
  errorMessage: string;
  onEmailChange: (value: string) => void;
  onNameChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onResetStatus: () => void;
  showName?: boolean;
  theme?: 'light' | 'dark';
}

function NewsletterForm({ 
  email, 
  name, 
  loading, 
  status, 
  errorMessage,
  onEmailChange,
  onNameChange,
  onSubmit,
  onResetStatus,
  showName = false,
  theme = 'light'
}: NewsletterFormProps) {
  const isDark = theme === 'dark';
  
  return (
    <div className="max-w-md mx-auto">
      <AnimatePresence mode="wait">
        {status === 'success' ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className={`text-center p-6 rounded-xl ${isDark ? 'bg-green-500/20' : 'bg-green-50'}`}
          >
            <CheckCircle 
              size={48} 
              className={`mx-auto mb-4 ${isDark ? 'text-green-300' : 'text-green-600'}`} 
            />
            <h4 className={`text-lg font-bold mb-2 ${isDark ? 'text-white' : 'text-green-800'}`}>
              ¡Suscripción exitosa!
            </h4>
            <p className={`text-sm ${isDark ? 'text-green-100' : 'text-green-700'}`}>
              Te hemos enviado un email de confirmación. Revisa tu bandeja de entrada.
            </p>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={onSubmit}
            className="space-y-4"
          >
            {/* Campo Nombre (opcional) */}
            {showName && (
              <input
                type="text"
                value={name}
                onChange={(e) => onNameChange(e.target.value)}
                placeholder="Tu nombre (opcional)"
                className={`w-full px-4 py-3 rounded-xl outline-none transition-all duration-300 ${
                  isDark 
                    ? 'bg-white/20 text-white placeholder-white/70 border border-white/30 focus:border-white focus:bg-white/30'
                    : 'border border-gray-300 focus:ring-2 focus:ring-slo-purple-500 focus:border-transparent'
                }`}
              />
            )}

            {/* Campo Email */}
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  onEmailChange(e.target.value);
                  if (status === 'error') onResetStatus();
                }}
                placeholder="tu@email.com"
                required
                className={`w-full px-4 py-3 rounded-xl outline-none transition-all duration-300 ${
                  isDark 
                    ? 'bg-white/20 text-white placeholder-white/70 border border-white/30 focus:border-white focus:bg-white/30'
                    : 'border border-gray-300 focus:ring-2 focus:ring-slo-purple-500 focus:border-transparent'
                } ${status === 'error' ? 'border-red-500' : ''}`}
              />
              <Mail 
                size={20} 
                className={`absolute right-3 top-3 ${
                  isDark ? 'text-white/50' : 'text-gray-400'
                }`} 
              />
            </div>

            {/* Error Message */}
            <AnimatePresence>
              {status === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className={`flex items-center gap-2 text-sm ${
                    isDark ? 'text-red-200' : 'text-red-600'
                  }`}
                >
                  <AlertCircle size={16} />
                  <span>{errorMessage}</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: loading ? 1 : 1.05 }}
              whileTap={{ scale: loading ? 1 : 0.95 }}
              className={`w-full py-3 rounded-xl font-bold transition-all duration-300 flex items-center justify-center gap-2 ${
                isDark
                  ? 'bg-white text-slo-purple-600 hover:bg-gray-100'
                  : 'bg-gradient-to-r from-slo-purple-600 to-slo-orange-500 text-white hover:from-slo-purple-700 hover:to-slo-orange-600'
              } disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                  <span>Suscribiendo...</span>
                </>
              ) : (
                <>
                  <Send size={18} />
                  <span>Suscribirme</span>
                </>
              )}
            </motion.button>

            {/* Privacy Notice */}
            <p className={`text-xs text-center ${isDark ? 'text-white/70' : 'text-gray-500'}`}>
              Al suscribirte aceptas recibir emails de San Luis Opina. 
              Puedes cancelar tu suscripción en cualquier momento.
            </p>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}