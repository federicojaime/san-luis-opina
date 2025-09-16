// src/app/noticias/page.tsx
'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import NewsGrid from '@/components/NewsGrid';
import RadioPlayer from '@/components/RadioPlayer';
import Footer from '@/components/Footer';
import { Article, Category } from '@/types';
import { apiClient } from '@/lib/api';
import { motion } from 'framer-motion';

export default function NoticiasPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalArticles, setTotalArticles] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [searchResults, setSearchResults] = useState<Article[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const ARTICLES_PER_PAGE = 12;

  useEffect(() => {
    loadData();
  }, [currentPage, selectedCategory]);

  const loadData = async () => {
    try {
      setLoading(true);
      
      const [newsResponse, categoriesData] = await Promise.all([
        apiClient.getAllNews({
          page: currentPage,
          limit: ARTICLES_PER_PAGE,
          category: selectedCategory || undefined
        }),
        apiClient.getCategories()
      ]);

      setArticles(newsResponse.data);
      setTotalArticles(newsResponse.pagination?.total || 0);
      setCategories(categoriesData);
    } catch (error) {
      console.error('Error loading news:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMore = async () => {
    try {
      const nextPage = Math.floor(articles.length / ARTICLES_PER_PAGE) + 1;
      const moreNews = await apiClient.getAllNews({
        page: nextPage,
        limit: ARTICLES_PER_PAGE,
        category: selectedCategory || undefined
      });
      
      setArticles([...articles, ...moreNews.data]);
    } catch (error) {
      console.error('Error loading more articles:', error);
    }
  };

  const handleCategoryFilter = (categorySlug: string) => {
    setSelectedCategory(categorySlug);
    setCurrentPage(1);
    setSearchResults([]);
    setSearchQuery('');
  };

  const handleSearch = async (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      setSearchQuery('');
      return;
    }

    try {
      setSearchQuery(query);
      const results = await apiClient.searchArticles(query, 20);
      setSearchResults(results.articles);
    } catch (error) {
      console.error('Search error:', error);
      setSearchResults([]);
    }
  };

  const clearSearch = () => {
    setSearchResults([]);
    setSearchQuery('');
  };

  const displayArticles = searchResults.length > 0 ? searchResults : articles;
  const isSearching = searchResults.length > 0 || searchQuery;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slo-purple-50 to-slo-orange-50">
      <Header onSearch={handleSearch} categories={categories} />

      <main className="container mx-auto px-4 py-12">
        {/* Header de la página */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold gradient-text mb-4">
            {isSearching 
              ? `Resultados para "${searchQuery}"`
              : selectedCategory 
                ? `Categoría: ${categories.find(c => c.slug === selectedCategory)?.name}`
                : 'Todas las Noticias'
            }
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-slo-purple-600 to-slo-orange-500 mx-auto rounded-full mb-8"></div>
          
          {isSearching && (
            <button
              onClick={clearSearch}
              className="text-slo-purple-600 hover:text-slo-purple-700 font-medium mb-8"
            >
              ← Volver a todas las noticias
            </button>
          )}
        </motion.div>

        {/* Filtros de categorías */}
        {!isSearching && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-12"
          >
            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={() => handleCategoryFilter('')}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                  !selectedCategory
                    ? 'bg-gradient-to-r from-slo-purple-600 to-slo-orange-500 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                Todas
              </button>
              {categories.map((category) => (
                <button
                  key={category.slug}
                  onClick={() => handleCategoryFilter(category.slug)}
                  className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                    selectedCategory === category.slug
                      ? 'text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                  style={{
                    backgroundColor: selectedCategory === category.slug ? category.color : undefined
                  }}
                >
                  {category.name} ({category.article_count})
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Grid de noticias */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slo-purple-600"></div>
          </div>
        ) : (
          <NewsGrid
            articles={displayArticles}
            title=""
            showLoadMore={!isSearching && articles.length < totalArticles}
            onLoadMore={handleLoadMore}
          />
        )}

        {/* Stats */}
        {!loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center mt-12 text-gray-600"
          >
            <p>
              {isSearching 
                ? `${displayArticles.length} resultado${displayArticles.length !== 1 ? 's' : ''} encontrado${displayArticles.length !== 1 ? 's' : ''}`
                : `Mostrando ${articles.length} de ${totalArticles} artículos`
              }
            </p>
          </motion.div>
        )}
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