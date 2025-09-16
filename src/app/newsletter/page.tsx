// src/app/newsletter/page.tsx
'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Newsletter from '@/components/Newsletter';
import Footer from '@/components/Footer';
import { Category } from '@/types';
import { apiClient } from '@/lib/api';
import { motion } from 'framer-motion';
import { Mail, CheckCircle, Users, Clock, Newspaper } from 'lucide-react';

export default function NewsletterPage() {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const categoriesData = await apiClient.getCategories();
        setCategories(categoriesData);
      } catch (error) {
        console.error('Error loading categories:', error);
      }
    };

    loadCategories();
  }, []);

  const handleSearch = () => {
    // Implementar búsqueda si es necesario
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slo-purple-50 to-slo-orange-50">
      <Header onSearch={handleSearch} categories={categories} />

      <main className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="w-24 h-24 bg-gradient-to-r from-slo-purple-600 to-slo-orange-500 rounded-full flex items-center justify-center mx-auto mb-8">
            <Mail className="text-white" size={40} />
          </div>
          
          <h1 className="text-6xl font-bold gradient-text mb-6">
            Newsletter San Luis Opina
          </h1>
          
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Mantente al día con las noticias más importantes de San Luis. 
            Recibe un resumen semanal de los acontecimientos más relevantes de tu ciudad.
          </p>
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid md:grid-cols-3 gap-8 mb-16"
        >
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Newspaper className="text-blue-600" size={24} />
            </div>
            <h3 className="text-xl font-bold mb-2">Noticias Curadas</h3>
            <p className="text-gray-600">
              Seleccionamos las noticias más importantes y relevantes para ti
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="text-green-600" size={24} />
            </div>
            <h3 className="text-xl font-bold mb-2">Envío Semanal</h3>
            <p className="text-gray-600">
              Recibe un resumen cada viernes con lo más destacado de la semana
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="text-purple-600" size={24} />
            </div>
            <h3 className="text-xl font-bold mb-2">Comunidad Local</h3>
            <p className="text-gray-600">
              Únete a miles de sanluiseños que ya están informados
            </p>
          </div>
        </motion.div>

        {/* Newsletter Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="max-w-2xl mx-auto mb-16"
        >
          <Newsletter variant="inline" />
        </motion.div>

        {/* Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="bg-white rounded-2xl p-8 shadow-xl"
        >
          <h2 className="text-3xl font-bold text-center gradient-text mb-8">
            ¿Qué incluye nuestro newsletter?
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="text-green-500 mt-1 flex-shrink-0" size={20} />
                <div>
                  <h4 className="font-semibold">Noticias Principales</h4>
                  <p className="text-gray-600 text-sm">Los eventos más importantes de la semana</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <CheckCircle className="text-green-500 mt-1 flex-shrink-0" size={20} />
                <div>
                  <h4 className="font-semibold">Política Local</h4>
                  <p className="text-gray-600 text-sm">Decisiones que afectan a la comunidad</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <CheckCircle className="text-green-500 mt-1 flex-shrink-0" size={20} />
                <div>
                  <h4 className="font-semibold">Eventos y Cultura</h4>
                  <p className="text-gray-600 text-sm">Actividades culturales y sociales</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="text-green-500 mt-1 flex-shrink-0" size={20} />
                <div>
                  <h4 className="font-semibold">Deportes Locales</h4>
                  <p className="text-gray-600 text-sm">Resultados y noticias deportivas</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <CheckCircle className="text-green-500 mt-1 flex-shrink-0" size={20} />
                <div>
                  <h4 className="font-semibold">Economía Regional</h4>
                  <p className="text-gray-600 text-sm">Desarrollo económico y oportunidades</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <CheckCircle className="text-green-500 mt-1 flex-shrink-0" size={20} />
                <div>
                  <h4 className="font-semibold">Servicios Públicos</h4>
                  <p className="text-gray-600 text-sm">Información sobre servicios municipales</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Privacy & Frequency */}
          <div className="mt-8 pt-8 border-t border-gray-200">
            <div className="grid md:grid-cols-2 gap-8 text-center">
              <div>
                <h4 className="font-semibold text-lg mb-2">Frecuencia</h4>
                <p className="text-gray-600">
                  Un email por semana, los viernes por la mañana. 
                  Sin spam, sin emails comerciales.
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold text-lg mb-2">Privacidad</h4>
                <p className="text-gray-600">
                  Tu email está seguro con nosotros. 
                  Puedes cancelar tu suscripción cuando quieras.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Testimonials */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-16"
        >
          <h2 className="text-3xl font-bold text-center gradient-text mb-12">
            Lo que dicen nuestros suscriptores
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-slo-purple-600 to-slo-orange-500 rounded-full flex items-center justify-center text-white font-bold">
                  M
                </div>
                <div>
                  <h4 className="font-semibold">María González</h4>
                  <p className="text-sm text-gray-500">Vecina de Capital</p>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "Excelente forma de mantenerse informada. Me encanta recibir el resumen semanal."
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-slo-purple-600 to-slo-orange-500 rounded-full flex items-center justify-center text-white font-bold">
                  J
                </div>
                <div>
                  <h4 className="font-semibold">Juan Pérez</h4>
                  <p className="text-sm text-gray-500">Comerciante</p>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "Información clara y precisa. Me ayuda a estar al día con lo que pasa en la ciudad."
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-slo-purple-600 to-slo-orange-500 rounded-full flex items-center justify-center text-white font-bold">
                  A
                </div>
                <div>
                  <h4 className="font-semibold">Ana Rodríguez</h4>
                  <p className="text-sm text-gray-500">Estudiante</p>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "Perfecto para estar informada sin perder tiempo. Información de calidad."
              </p>
            </div>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}