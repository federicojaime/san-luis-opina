// src/components/NewsGrid.tsx
'use client';

import { motion } from 'framer-motion';
import { Clock, Eye, User, Heart } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Article } from '@/types';

interface NewsGridProps {
  articles: Article[];
  title?: string;
  showLoadMore?: boolean;
  onLoadMore?: () => void;
  loading?: boolean;
}

export default function NewsGrid({ 
  articles, 
  title = "Todas las Noticias",
  showLoadMore = false,
  onLoadMore,
  loading = false
}: NewsGridProps) {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold gradient-text mb-4">{title}</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-slo-purple-600 to-slo-orange-500 mx-auto rounded-full"></div>
        </motion.div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {articles.map((article, index) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.1,
                ease: "easeOut"
              }}
              className="group"
            >
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden card-hover h-full flex flex-col">
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={article.featured_image}
                    alt={article.featured_image_alt || article.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  
                  {/* Featured Badge */}
                  {article.featured && (
                    <div className="absolute top-3 left-3">
                      <span className="bg-gradient-to-r from-slo-purple-600 to-slo-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                        Destacado
                      </span>
                    </div>
                  )}
                  
                  {/* Category Badge */}
                  <div className="absolute top-3 right-3">
                    <span 
                      className="px-3 py-1 rounded-full text-xs font-bold text-white"
                      style={{ backgroundColor: article.category_color }}
                    >
                      {article.category_name}
                    </span>
                  </div>

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col">
                  {/* Title */}
                  <Link href={article.url}>
                    <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-slo-purple-600 transition-colors duration-300">
                      {article.title}
                    </h3>
                  </Link>

                  {/* Excerpt */}
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-1">
                    {article.excerpt}
                  </p>

                  {/* Meta Info */}
                  <div className="space-y-3">
                    {/* Author & Time */}
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <div className="flex items-center gap-1">
                        <User size={12} />
                        <span>{article.author_name}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock size={12} />
                        <span>{article.time_ago}</span>
                      </div>
                    </div>

                    {/* Views & Read Button */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <Eye size={12} />
                        <span>{article.views.toLocaleString()}</span>
                      </div>
                      
                      <Link href={article.url}>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="bg-gradient-to-r from-slo-purple-600 to-slo-orange-500 text-white px-4 py-2 rounded-full text-xs font-bold hover:shadow-lg transition-all duration-300"
                        >
                          Leer más
                        </motion.button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Load More Button */}
        {showLoadMore && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center mt-12"
          >
            <button
              onClick={onLoadMore}
              disabled={loading}
              className="bg-gradient-to-r from-slo-purple-600 to-slo-orange-500 text-white px-8 py-4 rounded-full font-bold text-lg hover:from-slo-purple-700 hover:to-slo-orange-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Cargando...</span>
                </div>
              ) : (
                'Cargar Más Noticias'
              )}
            </button>
          </motion.div>
        )}

        {/* Empty State */}
        {articles.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-16"
          >
            <div className="bg-gradient-to-br from-slo-purple-100 to-slo-orange-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
              <Heart size={40} className="text-slo-purple-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-700 mb-2">No hay noticias disponibles</h3>
            <p className="text-gray-500">Pronto tendremos más contenido para ti.</p>
          </motion.div>
        )}
      </div>
    </section>
  );
}