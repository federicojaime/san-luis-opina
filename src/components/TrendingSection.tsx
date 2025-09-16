// src/components/TrendingSection.tsx
'use client';

import { motion } from 'framer-motion';
import { TrendingUp, Flame, Eye, Clock, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Article } from '@/types';

interface TrendingSectionProps {
  articles: Article[];
}

export default function TrendingSection({ articles }: TrendingSectionProps) {
  if (articles.length === 0) return null;

  return (
    <section className="py-20 bg-gradient-to-br from-red-50 via-orange-50 to-amber-50 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-red-200/30 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-200/30 rounded-full mix-blend-multiply filter blur-3xl animate-pulse animation-delay-2000"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-full px-8 py-4 shadow-lg mb-6">
            <Flame className="animate-pulse" size={24} />
            <h2 className="text-3xl font-bold">Tendencias</h2>
            <TrendingUp size={24} />
          </div>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            Las noticias más leídas y comentadas del momento
          </p>
        </motion.div>

        {/* Main Trending Article */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-1"
          >
            <div className="group relative overflow-hidden rounded-3xl shadow-2xl bg-white hover:shadow-3xl transition-all duration-500">
              {/* Trending Badge */}
              <div className="absolute top-6 left-6 z-20">
                <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white px-4 py-2 rounded-full font-bold text-sm flex items-center gap-2 shadow-lg animate-pulse">
                  <Flame size={16} />
                  <span>MÁS LEÍDA</span>
                </div>
              </div>

              <div className="relative h-80 overflow-hidden">
                <Image
                  src={articles[0].featured_image}
                  alt={articles[0].title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                
                <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                  <span 
                    className="inline-block px-3 py-1 rounded-full text-xs font-bold mb-3"
                    style={{ backgroundColor: articles[0].category_color }}
                  >
                    {articles[0].category_name}
                  </span>
                  
                  <h3 className="text-2xl font-bold mb-3 leading-tight">
                    {articles[0].title}
                  </h3>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-300">
                    <div className="flex items-center gap-1">
                      <Eye size={14} />
                      <span>{articles[0].views.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock size={14} />
                      <span>{articles[0].time_ago}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Trending List */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-1"
          >
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/50 h-full">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center">
                  <TrendingUp className="text-white" size={20} />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Top Tendencias</h3>
              </div>

              <div className="space-y-6">
                {articles.slice(1, 5).map((article, index) => (
                  <motion.div
                    key={article.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                  >
                    <Link href={article.url} className="group block">
                      <div className="flex items-center gap-4 hover:bg-gradient-to-r hover:from-red-50 hover:to-orange-50 p-3 rounded-xl transition-all duration-300">
                        
                        {/* Rank */}
                        <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                          {index + 2}
                        </div>

                        {/* Thumbnail */}
                        <div className="relative w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden">
                          <Image
                            src={article.featured_image}
                            alt={article.title}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-gray-900 line-clamp-2 group-hover:text-red-600 transition-colors duration-300 text-sm leading-tight mb-1">
                            {article.title}
                          </h4>
                          
                          <div className="flex items-center gap-3 text-xs text-gray-500">
                            <div className="flex items-center gap-1">
                              <Eye size={10} />
                              <span>{article.views.toLocaleString()}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Flame size={10} className="text-red-500" />
                              <span>Trending</span>
                            </div>
                          </div>
                        </div>

                        {/* Arrow */}
                        <ArrowRight size={16} className="text-gray-400 group-hover:text-red-500 group-hover:translate-x-1 transition-all duration-300" />
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* View All Trending */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <Link href="/noticias?featured=true">
                  <button className="w-full bg-gradient-to-r from-red-500 to-orange-500 text-white py-3 rounded-xl font-bold hover:from-red-600 hover:to-orange-600 transition-all duration-300 flex items-center justify-center gap-2 group">
                    <Flame size={18} />
                    <span>Ver Todas las Tendencias</span>
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Quick Trending Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {articles.slice(0, 3).map((article, index) => (
            <div key={article.id} className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="relative h-48">
                <Image
                  src={article.featured_image}
                  alt={article.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                
                {/* Trending indicator */}
                <div className="absolute top-3 right-3">
                  <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center animate-pulse">
                    <Flame className="text-white" size={12} />
                  </div>
                </div>

                <div className="absolute bottom-3 left-3 right-3">
                  <h4 className="text-white font-bold text-sm line-clamp-2 leading-tight">
                    {article.title}
                  </h4>
                  <div className="flex items-center gap-2 text-xs text-white/80 mt-1">
                    <Eye size={10} />
                    <span>{article.views}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}