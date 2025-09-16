'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wifi, WifiOff, AlertCircle } from 'lucide-react';
import { apiClient } from '@/lib/api';

export default function ApiStatus() {
  const [isConnected, setIsConnected] = useState<boolean | null>(null);
  const [showStatus, setShowStatus] = useState(true);

  useEffect(() => {
    const checkConnection = async () => {
      const connected = await apiClient.testConnection();
      setIsConnected(connected);
      
      // Auto-hide después de 5 segundos si está conectado
      if (connected) {
        setTimeout(() => setShowStatus(false), 5000);
      }
    };

    checkConnection();
  }, []);

  if (!showStatus) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        className="fixed top-20 right-4 z-50"
      >
        <div className={`
          px-4 py-2 rounded-lg shadow-lg border
          ${isConnected === null 
            ? 'bg-yellow-50 border-yellow-200 text-yellow-800' 
            : isConnected 
              ? 'bg-green-50 border-green-200 text-green-800'
              : 'bg-red-50 border-red-200 text-red-800'
          }
        `}>
          <div className="flex items-center gap-2 text-sm">
            {isConnected === null ? (
              <>
                <AlertCircle size={16} />
                <span>Verificando API...</span>
              </>
            ) : isConnected ? (
              <>
                <Wifi size={16} />
                <span>API Conectada</span>
              </>
            ) : (
              <>
                <WifiOff size={16} />
                <span>Modo Demo - API Desconectada</span>
              </>
            )}
            
            <button
              onClick={() => setShowStatus(false)}
              className="ml-2 text-gray-500 hover:text-gray-700"
            >
              ×
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}