// src/app/articulo/[slug]/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Clock, Eye, User, ArrowLeft, Share2, Heart, Tag } from 'lucide-react';
import Header from '@/components/Header';
import NewsGrid from '@/components/NewsGrid';
import RadioPlayer from '@/components/RadioPlayer';
import Footer from '@/components/Footer';
import { Article, Category } from '@/types';
import { apiClient } from '@/lib/api';

export default function ArticlePage() {
  const params = useParams();
  const slug = params.slug as string;
  
  const [article, setArticle] = useState<Article | null>(null);
  const [relatedArticles, setRelatedArticles] = useState<Article[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadArticle = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const [articleData, categoriesData] = await Promise.all([
          apiClient.getArticle(slug),
          apiClient.getCategories()
        ]);

        setArticle(articleData);
        setCategories(categoriesData);
        
        // Cargar artículos relacionados si existen
        if (articleData.related_articles) {
          setRelatedArticles(articleData.related_articles);
        } else {
          const latestData = await apiClient.getLatestNews(4);
          setRelatedArticles(latestData.filter(art => art.id !== articleData.id));
        }
      } catch (error) {
        console.error('Error loading article:', error);
        setError('No se pudo cargar el artículo');
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      loadArticle();
    }
  }, [slug]);

  const handleSearch = async (query: string) => {
    // Implementar búsqueda si es necesario
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slo-purple-50 to-slo-orange-50">
        <Header onSearch={handleSearch} categories={categories} />
        <div className="container mx-auto px-4 py-16">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slo-purple-600"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slo-purple-50 to-slo-orange-50">
        <Header onSearch={handleSearch} categories={categories} />
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Artículo no encontrado</h1>
            <p className="text-gray-600 mb-8">El artículo que buscas no existe o ha sido eliminado.</p>
            <Link href="/">
              <button className="bg-gradient-to-r from-slo-purple-600 to-slo-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-slo-purple-700 hover:to-slo-orange-600 transition-all duration-300">
                Volver al inicio
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slo-purple-50 to-slo-orange-50">
      <Header onSearch={handleSearch} categories={categories} />
      
      <main className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <Link href="/" className="text-slo-purple-600 hover:text-slo-purple-700 flex items-center gap-2">
            <ArrowLeft size={20} />
            Volver al inicio
          </Link>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Artículo principal */}
          <motion.article
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2"
          >
            {/* Imagen destacada */}
            <div className="relative h-96 rounded-2xl overflow-hidden mb-8 shadow-2xl">
              <Image
                src={article.featured_image}
                alt={article.featured_image_alt || article.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              
              {/* Badge de categoría */}
              <div className="absolute top-6 left-6">
                <span 
                  className="px-4 py-2 rounded-full text-white font-bold text-sm"
                  style={{ backgroundColor: article.category_color }}
                >
                  {article.category_name}
                </span>
              </div>

              {/* Featured badge */}
              {article.featured && (
                <div className="absolute top-6 right-6">
                  <span className="bg-gradient-to-r from-slo-purple-600 to-slo-orange-500 text-white px-4 py-2 rounded-full text-sm font-bold">
                    Destacado
                  </span>
                </div>
              )}
            </div>

            {/* Título y meta */}
            <div className="mb-8">
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                {article.title}
              </h1>
              
              <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-6">
                <div className="flex items-center gap-2">
                  <User size={18} />
                  <span>{article.author_name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={18} />
                  <span>{article.time_ago}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Eye size={18} />
                  <span>{article.views.toLocaleString()} vistas</span>
                </div>
              </div>

              {/* Excerpt */}
              <p className="text-xl text-gray-700 leading-relaxed mb-8 p-6 bg-gray-50 rounded-xl border-l-4 border-slo-purple-500">
                {article.excerpt}
              </p>
            </div>

            {/* Contenido del artículo */}
            <div 
              className="prose prose-lg max-w-none mb-12"
              dangerouslySetInnerHTML={{ __html: article.content || article.excerpt }}
            />

            {/* Tags */}
            {article.tags && article.tags.length > 0 && (
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Tag size={20} />
                  Etiquetas
                </h3>
                <div className="flex flex-wrap gap-2">
                  {article.tags.map((tag) => (
                    <span
                      key={tag.slug}
                      className="px-3 py-1 rounded-full text-sm font-medium text-white"
                      style={{ backgroundColor: tag.color }}
                    >
                      {tag.name}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Compartir */}
            <div className="flex items-center justify-between p-6 bg-white rounded-xl shadow-lg">
              <div className="flex items-center gap-4">
                <button className="flex items-center gap-2 text-red-600 hover:text-red-700">
                  <Heart size={20} />
                  <span>Me gusta</span>
                </button>
                <button className="flex items-center gap-2 text-blue-600 hover:text-blue-700">
                  <Share2 size={20} />
                  <span>Compartir</span>
                </button>
              </div>
              <div className="text-sm text-gray-500">
                Publicado: {article.published_at_formatted || new Date(article.published_at).toLocaleDateString()}
              </div>
            </div>
          </motion.article>

          {/* Sidebar */}
          <motion.aside
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-1"
          >
            {/* Info del autor */}
            {article.author_bio && (
              <div className="bg-white rounded-2xl p-6 shadow-lg mb-8">
                <h3 className="text-xl font-bold mb-4">Sobre el autor</h3>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-slo-purple-600 to-slo-orange-500 rounded-full flex items-center justify-center text-white font-bold">
                    {article.author_name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-semibold">{article.author_name}</h4>
                  </div>
                </div>
                <p className="text-gray-600 text-sm">{article.author_bio}</p>
              </div>
            )}

            {/* Artículos relacionados */}
            {relatedArticles.length > 0 && (
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-xl font-bold mb-6">Artículos Relacionados</h3>
                <div className="space-y-6">
                  {relatedArticles.map((related) => (
                    <Link key={related.id} href={related.url} className="block group">
                      <div className="flex gap-4">
                        <div className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden">
                          <Image
                            src={related.featured_image}
                            alt={related.title}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-sm line-clamp-2 group-hover:text-slo-purple-600 transition-colors duration-300">
                            {related.title}
                          </h4>
                          <p className="text-xs text-gray-500 mt-1">{related.time_ago}</p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </motion.aside>
        </div>
      </main>

      <RadioPlayer 
        streamUrl=""
        stationName="Radio San Luis Opina"
        currentShow="Programa en Vivo"
        isLive={true}
      />

      <Footer />
    </div>
  );
}