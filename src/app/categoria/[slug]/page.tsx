// src/app/categoria/[slug]/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Header from '@/components/Header';
import NewsGrid from '@/components/NewsGrid';
import RadioPlayer from '@/components/RadioPlayer';
import Footer from '@/components/Footer';
import { Article, Category } from '@/types';
import { apiClient } from '@/lib/api';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function CategoryPage() {
  const params = useParams();
  const categorySlug = params.slug as string;
  
  const [articles, setArticles] = useState<Article[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [currentCategory, setCurrentCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState(true);
  const [totalArticles, setTotalArticles] = useState(0);

  useEffect(() => {
    loadCategoryData();
  }, [categorySlug]);

  const loadCategoryData = async () => {
    try {
      setLoading(true);
      
      const [newsResponse, categoriesData] = await Promise.all([
        apiClient.getAllNews({
          category: categorySlug,
          limit: 12
        }),
        apiClient.getCategories()
      ]);

      setArticles(newsResponse.data);
      setTotalArticles(newsResponse.pagination?.total || 0);
      setCategories(categoriesData);
      
      // Encontrar la categoría actual
      const category = categoriesData.find(cat => cat.slug === categorySlug);
      setCurrentCategory(category || null);
    } catch (error) {
      console.error('Error loading category data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMore = async () => {
    try {
      const nextPage = Math.floor(articles.length / 12) + 1;
      const moreNews = await apiClient.getAllNews({
        page: nextPage,
        limit: 12,
        category: categorySlug
      });
      
      setArticles([...articles, ...moreNews.data]);
    } catch (error) {
      console.error('Error loading more articles:', error);
    }
  };

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

  if (!currentCategory) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slo-purple-50 to-slo-orange-50">
        <Header onSearch={handleSearch} categories={categories} />
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Categoría no encontrada</h1>
            <p className="text-gray-600 mb-8">La categoría que buscas no existe.</p>
            <Link href="/noticias">
              <button className="bg-gradient-to-r from-slo-purple-600 to-slo-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-slo-purple-700 hover:to-slo-orange-600 transition-all duration-300">
                Ver todas las noticias
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

      <main className="container mx-auto px-4 py-12">
        {/* Header de la categoría */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          {/* Breadcrumb */}
          <div className="mb-6">
            <Link href="/" className="text-slo-purple-600 hover:text-slo-purple-700">
              Inicio
            </Link>
            <span className="mx-2 text-gray-400">/</span>
            <Link href="/noticias" className="text-slo-purple-600 hover:text-slo-purple-700">
              Noticias
            </Link>
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-gray-600">{currentCategory.name}</span>
          </div>

          {/* Título de la categoría */}
          <div 
            className="inline-block px-8 py-4 rounded-2xl text-white mb-6"
            style={{ backgroundColor: currentCategory.color }}
          >
            <h1 className="text-5xl font-bold">{currentCategory.name}</h1>
          </div>
          
          {/* Descripción */}
          {currentCategory.description && (
            <p className="text-xl text-gray-700 mb-4 max-w-2xl mx-auto">
              {currentCategory.description}
            </p>
          )}
          
          <p className="text-gray-600">
            {totalArticles} artículo{totalArticles !== 1 ? 's' : ''} en esta categoría
          </p>
        </motion.div>

        {/* Otras categorías */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold text-center mb-6">Explorar otras categorías</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {categories
              .filter(cat => cat.slug !== categorySlug)
              .map((category) => (
                <Link
                  key={category.slug}
                  href={`/categoria/${category.slug}`}
                  className="group"
                >
                  <div 
                    className="px-6 py-3 rounded-full text-white font-semibold hover:shadow-lg transition-all duration-300 group-hover:scale-105"
                    style={{ backgroundColor: category.color }}
                  >
                    {category.name} ({category.article_count})
                  </div>
                </Link>
              ))}
          </div>
        </motion.div>

        {/* Grid de noticias */}
        <NewsGrid
          articles={articles}
          title=""
          showLoadMore={articles.length < totalArticles}
          onLoadMore={handleLoadMore}
        />

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-12 text-gray-600"
        >
          <p>
            Mostrando {articles.length} de {totalArticles} artículos en {currentCategory.name}
          </p>
        </motion.div>
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