// src/app/page.tsx
'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import NewsGrid from '@/components/NewsGrid';
import RadioPlayer from '@/components/RadioPlayer';
import Footer from '@/components/Footer';
import ApiStatus from '@/components/ApiStatus';
import NewsletterModal from '@/components/NewsletterModal';
import { Article, Category } from '@/types';
import { apiClient } from '@/lib/api';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

export default function HomePage() {
  const [featuredArticle, setFeaturedArticle] = useState<Article | null>(null);
  const [latestArticles, setLatestArticles] = useState<Article[]>([]);
  const [allArticles, setAllArticles] = useState<Article[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchResults, setSearchResults] = useState<Article[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Load initial data
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        setLoading(true);
        
        // Load data in parallel
        const [featured, latest, news, cats] = await Promise.all([
          apiClient.getFeaturedArticle(),
          apiClient.getLatestNews(8),
          apiClient.getAllNews({ limit: 12 }),
          apiClient.getCategories()
        ]);

        setFeaturedArticle(featured);
        setLatestArticles(latest);
        setAllArticles(news.data);
        setCategories(cats);
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadInitialData();
  }, []);

  // Handle search
  const handleSearch = async (query: string) => {
    if (!query.trim()) {
      setIsSearching(false);
      setSearchResults([]);
      setSearchQuery('');
      return;
    }

    try {
      setIsSearching(true);
      setSearchQuery(query);
      
      const results = await apiClient.searchArticles(query, 20);
      setSearchResults(results.articles);
    } catch (error) {
      console.error('Search error:', error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  // Clear search
  const clearSearch = () => {
    setSearchResults([]);
    setSearchQuery('');
    setIsSearching(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slo-purple-50 to-slo-orange-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="w-16 h-16 mx-auto mb-4 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-slo-purple-600 to-slo-orange-500 rounded-full animate-spin">
              <div className="absolute inset-2 bg-white rounded-full"></div>
            </div>
            <Loader2 className="absolute inset-4 text-slo-purple-600 animate-spin" size={32} />
          </div>
          <h3 className="text-xl font-bold gradient-text mb-2">San Luis Opina</h3>
          <p className="text-gray-600">Cargando las últimas noticias...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slo-purple-50 via-white to-slo-orange-50">
      {/* Header */}
      <Header onSearch={handleSearch} categories={categories} />

      {/* Search Results or Normal Content */}
      {searchResults.length > 0 || isSearching ? (
        <div className="py-12">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-8"
            >
              <h2 className="text-3xl font-bold gradient-text mb-4">
                Resultados de búsqueda para "{searchQuery}"
              </h2>
              <button
                onClick={clearSearch}
                className="text-slo-purple-600 hover:text-slo-purple-700 font-medium"
              >
                ← Volver al inicio
              </button>
            </motion.div>
            
            {isSearching ? (
              <div className="text-center py-12">
                <Loader2 className="mx-auto animate-spin text-slo-purple-600 mb-4" size={40} />
                <p className="text-gray-600">Buscando noticias...</p>
              </div>
            ) : (
              <NewsGrid articles={searchResults} title={`${searchResults.length} resultados encontrados`} />
            )}
          </div>
        </div>
      ) : (
        <>
          {/* Hero Section */}
          <HeroSection 
            featuredArticle={featuredArticle} 
            latestArticles={latestArticles} 
          />

          {/* Categories Section */}
          <section className="py-16 bg-white/50">
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center mb-12"
              >
                <h2 className="text-4xl font-bold gradient-text mb-4">Explora por Categorías</h2>
                <div className="w-24 h-1 bg-gradient-to-r from-slo-purple-600 to-slo-orange-500 mx-auto rounded-full"></div>
              </motion.div>

              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {categories.map((category, index) => (
                  <motion.a
                    key={category.id}
                    href={`/categoria/${category.slug}`}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="group relative overflow-hidden rounded-2xl aspect-square"
                    style={{ backgroundColor: category.color }}
                  >
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300"></div>
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-4">
                      <h3 className="font-bold text-lg text-center mb-2">{category.name}</h3>
                      <span className="text-sm opacity-90">
                        {category.article_count} artículos
                      </span>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                  </motion.a>
                ))}
              </div>
            </div>
          </section>

          {/* All News Grid */}
          <NewsGrid 
            articles={allArticles} 
            title="Todas las Noticias"
            showLoadMore={true}
            onLoadMore={async () => {
              // Implement pagination
              try {
                const nextPage = Math.floor(allArticles.length / 12) + 1;
                const moreNews = await apiClient.getAllNews({ 
                  page: nextPage, 
                  limit: 12 
                });
                setAllArticles([...allArticles, ...moreNews.data]);
              } catch (error) {
                console.error('Error loading more articles:', error);
              }
            }}
          />
        </>
      )}

      {/* Radio Player */}
      <RadioPlayer 
        streamUrl="" // Aquí pondrás tu URL de stream
        stationName="Radio San Luis Opina"
        currentShow="Programa en Vivo"
        isLive={true}
      />

      {/* Newsletter Modal */}
      <NewsletterModal />

      {/* Footer */}
      <Footer />
    </div>
  );
}