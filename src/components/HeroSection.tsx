// src/components/HeroSection.tsx
'use client';

import { motion } from 'framer-motion';
import { Clock, Eye, User } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Article } from '@/types';

interface HeroSectionProps {
  featuredArticle: Article | null;
  latestArticles: Article[];
}

export default function HeroSection({ featuredArticle, latestArticles }: HeroSectionProps) {
  if (!featuredArticle) return null;

  return (
    <section className="relative py-12 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-slo-purple-50 via-white to-slo-orange-50">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.1),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(251,146,60,0.1),transparent_50%)]"></div>
      </div>

      <div className="container mx-auto px-4 relative">
        <div className="grid lg:grid-cols-3 gap-8 items-start">
          {/* Featured Article - Main */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-2"
          >
            <div className="group relative overflow-hidden rounded-3xl shadow-2xl bg-white card-hover">
              {/* Featured Badge */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring", stiffness: 100 }}
                className="absolute top-6 left-6 z-20"
              >
                <span className="bg-gradient-to-r from-slo-purple-600 to-slo-orange-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                  ⭐ Destacado
                </span>
              </motion.div>

              {/* Image */}
              <div className="relative h-96 lg:h-[500px] overflow-hidden">
                <Image
                  src={featuredArticle.featured_image}
                  alt={featuredArticle.featured_image_alt || featuredArticle.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                
                {/* Content Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    {/* Category */}
                    <div className="mb-4">
                      <span 
                        className="inline-block px-3 py-1 rounded-full text-xs font-bold"
                        style={{ backgroundColor: featuredArticle.category_color }}
                      >
                        {featuredArticle.category_name}
                      </span>
                    </div>
                    
                    {/* Title */}
                    <h2 className="text-3xl lg:text-4xl font-bold mb-4 leading-tight">
                      {featuredArticle.title}
                    </h2>
                    
                    {/* Excerpt */}
                    <p className="text-lg text-gray-200 mb-6 line-clamp-2">
                      {featuredArticle.excerpt}
                    </p>
                    
                    {/* Meta Info */}
                    <div className="flex flex-wrap items-center gap-6 text-sm text-gray-300">
                      <div className="flex items-center gap-2">
                        <User size={16} />
                        <span>{featuredArticle.author_name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock size={16} />
                        <span>{featuredArticle.time_ago}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Eye size={16} />
                        <span>{featuredArticle.views.toLocaleString()} vistas</span>
                      </div>
                    </div>
                    
                    {/* Read More Button */}
                    <Link href={featuredArticle.url}>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="mt-6 bg-gradient-to-r from-slo-purple-600 to-slo-orange-500 text-white px-8 py-3 rounded-full font-bold shadow-lg hover:shadow-xl transition-all duration-300"
                      >
                        Leer Artículo Completo
                      </motion.button>
                    </Link>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Latest Articles - Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-1"
          >
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="text-2xl font-bold gradient-text mb-6">Últimas Noticias</h3>
              
              <div className="space-y-6">
                {latestArticles.slice(0, 4).map((article, index) => (
                  <motion.div
                    key={article.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                  >
                    <Link href={article.url} className="group block">
                      <div className="flex gap-4 hover:bg-gray-50 p-3 rounded-xl transition-colors duration-300">
                        {/* Thumbnail */}
                        <div className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden">
                          <Image
                            src={article.featured_image}
                            alt={article.title}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                        </div>
                        
                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          {/* Category */}
                          <span 
                            className="inline-block px-2 py-1 rounded text-xs font-bold text-white mb-2"
                            style={{ backgroundColor: article.category_color }}
                          >
                            {article.category_name}
                          </span>
                          
                          {/* Title */}
                          <h4 className="font-bold text-gray-900 line-clamp-2 group-hover:text-slo-purple-600 transition-colors duration-300">
                            {article.title}
                          </h4>
                          
                          {/* Time */}
                          <p className="text-sm text-gray-500 mt-1">
                            {article.time_ago}
                          </p>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
              
              {/* View All Button */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="mt-6 pt-6 border-t border-gray-200"
              >
                <Link href="/noticias">
                  <button className="w-full bg-gradient-to-r from-slo-purple-100 to-slo-orange-100 text-slo-purple-700 py-3 rounded-xl font-bold hover:from-slo-purple-200 hover:to-slo-orange-200 transition-all duration-300">
                    Ver Todas las Noticias
                  </button>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}