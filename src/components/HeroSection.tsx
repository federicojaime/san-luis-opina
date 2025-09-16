// src/components/HeroSection.tsx
'use client';

import { motion } from 'framer-motion';
import { Clock, Eye, ArrowRight } from 'lucide-react';
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
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-3 gap-12 items-start">
          
          {/* Featured Article */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2"
          >
            <div className="group relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
              
              {/* Image */}
              <div className="relative h-96 lg:h-[500px] overflow-hidden">
                <Image
                  src={featuredArticle.featured_image}
                  alt={featuredArticle.featured_image_alt || featuredArticle.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                
                {/* Category Badge */}
                <div className="absolute top-6 left-6">
                  <span 
                    className="px-3 py-1 rounded-full text-white text-sm font-medium"
                    style={{ backgroundColor: featuredArticle.category_color }}
                  >
                    {featuredArticle.category_name}
                  </span>
                </div>

                {/* Content Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <h1 className="text-3xl lg:text-4xl font-bold mb-4 leading-tight">
                      {featuredArticle.title}
                    </h1>
                    
                    <p className="text-lg text-gray-200 mb-6 line-clamp-2">
                      {featuredArticle.excerpt}
                    </p>
                    
                    <div className="flex items-center gap-6 text-sm text-gray-300 mb-6">
                      <div className="flex items-center gap-2">
                        <Clock size={16} />
                        <span>{featuredArticle.time_ago}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Eye size={16} />
                        <span>{featuredArticle.views.toLocaleString()}</span>
                      </div>
                    </div>
                    
                    <Link href={featuredArticle.url}>
                      <button className="inline-flex items-center gap-2 bg-white text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300">
                        Leer artículo
                        <ArrowRight size={18} />
                      </button>
                    </Link>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Latest Articles Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-1"
          >
            <div className="bg-gray-50 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Últimas noticias</h3>
              
              <div className="space-y-6">
                {latestArticles.slice(0, 4).map((article, index) => (
                  <motion.div
                    key={article.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                  >
                    <Link href={article.url} className="group block">
                      <div className="flex gap-4 hover:bg-white hover:shadow-sm p-3 rounded-xl transition-all duration-300">
                        <div className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden">
                          <Image
                            src={article.featured_image}
                            alt={article.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <span 
                            className="inline-block px-2 py-1 rounded text-xs font-medium text-white mb-2"
                            style={{ backgroundColor: article.category_color }}
                          >
                            {article.category_name}
                          </span>
                          
                          <h4 className="font-semibold text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors duration-300 text-sm leading-tight mb-1">
                            {article.title}
                          </h4>
                          
                          <p className="text-xs text-gray-500">{article.time_ago}</p>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
              
              <div className="mt-6 pt-6 border-t border-gray-200">
                <Link href="/noticias">
                  <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300">
                    Ver todas las noticias
                  </button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}