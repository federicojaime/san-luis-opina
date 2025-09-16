// src/components/StatsSection.tsx
'use client';

import { motion } from 'framer-motion';
import { Eye, FileText, Folder, Calendar } from 'lucide-react';
import { SiteStats } from '@/types';

interface StatsSectionProps {
  stats: SiteStats;
}

export default function StatsSection({ stats }: StatsSectionProps) {
  const statsData = [
    {
      icon: FileText,
      label: 'Artículos Publicados',
      value: stats.total_articles,
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600'
    },
    {
      icon: Folder,
      label: 'Categorías Activas',
      value: stats.total_categories,
      color: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600'
    },
    {
      icon: Eye,
      label: 'Vistas Totales',
      value: stats.total_views.toLocaleString(),
      color: 'from-green-500 to-teal-500',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600'
    },
    {
      icon: Calendar,
      label: 'Publicadas Hoy',
      value: stats.articles_today,
      color: 'from-orange-500 to-red-500',
      bgColor: 'bg-orange-50',
      textColor: 'text-orange-600'
    }
  ];

  return (
    <section className="py-16 bg-white/50 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            San Luis Opina en Números
          </h2>
          <p className="text-gray-600 text-lg">El impacto de nuestro trabajo en la comunidad</p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {statsData.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="group"
            >
              <div className={`${stat.bgColor} rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300 border border-white/50`}>
                <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${stat.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <stat.icon className="text-white" size={24} />
                </div>
                
                <motion.div
                  initial={{ scale: 0.5 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 0.8, delay: index * 0.1 + 0.3 }}
                  className={`text-3xl font-bold ${stat.textColor} mb-2`}
                >
                  {stat.value}
                </motion.div>
                
                <p className="text-gray-600 font-medium">
                  {stat.label}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}