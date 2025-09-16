// src/components/SponsorsSection.tsx
'use client';

import { motion } from 'framer-motion';
import { ExternalLink, Heart, Star } from 'lucide-react';
import Image from 'next/image';
import { Sponsor } from '@/types';

interface SponsorsSectionProps {
  sponsors: Sponsor[];
}

export default function SponsorsSection({ sponsors }: SponsorsSectionProps) {
  if (sponsors.length === 0) return null;

  return (
    <section className="py-20 bg-gradient-to-r from-slate-100 via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(99,102,241,0.03)_25%,transparent_25%),linear-gradient(-45deg,rgba(99,102,241,0.03)_25%,transparent_25%)] bg-[size:40px_40px]"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm rounded-full px-8 py-4 shadow-lg mb-6">
            <Heart className="text-red-500" size={24} />
            <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Nuestros Aliados
            </h2>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Empresas que confían en nosotros y apoyan el periodismo local de calidad
          </p>
        </motion.div>

        {/* Sponsors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {sponsors.map((sponsor, index) => (
            <motion.div
              key={sponsor.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.02, y: -5 }}
              className="group"
            >
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-white/50 h-full flex flex-col">
                
                {/* Priority Badge */}
                {sponsor.priority === 1 && (
                  <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold mb-4 self-start">
                    <Star className="w-3 h-3 fill-current" />
                    <span>SPONSOR PRINCIPAL</span>
                  </div>
                )}

                {/* Logo */}
                <div className="relative h-20 mb-6 flex items-center justify-center">
                  <Image
                    src={sponsor.logo_url}
                    alt={sponsor.name}
                    width={160}
                    height={80}
                    className="max-h-full w-auto object-contain group-hover:scale-110 transition-transform duration-500"
                  />
                </div>

                {/* Content */}
                <div className="flex-1 flex flex-col">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">
                    {sponsor.name}
                  </h3>
                  
                  <p className="text-gray-600 text-sm leading-relaxed mb-6 flex-1">
                    {sponsor.description}
                  </p>

                  {/* CTA Button */}
                  <a
                    href={sponsor.website_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-full font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 text-center justify-center group-hover:scale-105"
                  >
                    <span>Visitar Sitio</span>
                    <ExternalLink size={16} className="group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action for Sponsors */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center"
        >
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/50 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              ¿Quieres ser nuestro aliado?
            </h3>
            <p className="text-gray-600 mb-6">
              Únete a las empresas que apoyan el periodismo local y llega a miles de sanluiseños cada día.
            </p>
            <button className="bg-gradient-to-r from-green-600 to-teal-600 text-white px-8 py-4 rounded-full font-bold hover:from-green-700 hover:to-teal-700 transition-all duration-300 shadow-lg hover:shadow-xl">
              Contactar para Publicidad
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}