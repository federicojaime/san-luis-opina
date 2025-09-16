'use client';

import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import Newsletter from './Newsletter';

export default function NewsletterModal() {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Verificar si ya se mostró el modal en esta sesión
    const hasShownModal = sessionStorage.getItem('newsletter-modal-shown');
    
    if (!hasShownModal) {
      // Mostrar el modal después de 30 segundos o cuando el usuario haga scroll
      const timer = setTimeout(() => {
        setShowModal(true);
      }, 30000); // 30 segundos

      const handleScroll = () => {
        const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        
        if (scrollPercent > 25) { // Cuando haya hecho scroll 25%
          setShowModal(true);
          window.removeEventListener('scroll', handleScroll);
        }
      };

      window.addEventListener('scroll', handleScroll);

      return () => {
        clearTimeout(timer);
        window.removeEventListener('scroll', handleScroll);
      };
    }
  }, []);

  const handleClose = () => {
    setShowModal(false);
    // Marcar que ya se mostró en esta sesión
    sessionStorage.setItem('newsletter-modal-shown', 'true');
  };

  return (
    <AnimatePresence>
      {showModal && (
        <Newsletter 
          variant="modal" 
          onClose={handleClose}
        />
      )}
    </AnimatePresence>
  );
}