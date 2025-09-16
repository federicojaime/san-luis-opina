// src/app/page.tsx
'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import NewsGrid from '@/components/NewsGrid';
import RadioPlayer from '@/components/RadioPlayer';
import Footer from '@/components/Footer';
import NewsletterModal from '@/components/NewsletterModal';
import SponsorsSection from '@/components/SponsorsSection';
import StatsSection from '@/components/StatsSection';
import TrendingSection from '@/components/TrendingSection';
import { Article, Category, Sponsor, SiteStats } from '@/types';
import { apiClient } from '@/lib/api';
import { motion } from 'framer-motion';
import { Loader2, Newspaper, TrendingUp, Users, Eye, Star, Zap, Play, ArrowRight, Heart, Radio, Send, Flame } from 'lucide-react';

export default function HomePage() {
  const [featuredArticle, setFeaturedArticle] = useState<Article | null>(null);
  const [latestArticles, setLatestArticles] = useState<Article[]>([]);
  const [allArticles, setAllArticles] = useState<Article[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [sponsors, setSponsors] = useState<Sponsor[]>([]);
  const [stats, setStats] = useState<SiteStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchResults, setSearchResults] = useState<Article[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Load initial data
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        setLoading(true);
        
        const [featured, latest, news, cats, sponsorData, statsData] = await Promise.all([
          apiClient.getFeaturedArticle(),
          apiClient.getLatestNews(8),
          apiClient.getAllNews({ limit: 12 }),
          apiClient.getCategories(),
          apiClient.getSponsors(),
          apiClient.getSiteStats()
        ]);

        setFeaturedArticle(featured);
        setLatestArticles(latest);
        setAllArticles(news.data);
        setCategories(cats);
        setSponsors(sponsorData);
        setStats(statsData);
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
      <div className="min-h-screen bg-gradient-to-br from-violet-600 via-purple-500 to-orange-500 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="relative w-32 h-32 mx-auto mb-8">
            <div className="absolute inset-0 bg-gradient-to-r from-violet-400 to-orange-400 rounded-full animate-pulse"></div>
            <div className="absolute inset-4 bg-white rounded-full flex items-center justify-center">
              <Loader2 className="text-violet-600 animate-spin" size={48} />
            </div>
          </div>
          <h3 className="text-4xl font-black text-white mb-4 drop-shadow-lg">
            San Luis Opina
          </h3>
          <p className="text-white/90 text-xl font-medium">Cargando las últimas noticias...</p>
          <div className="mt-6 flex justify-center space-x-2">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="w-4 h-4 bg-white rounded-full animate-bounce"
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            ))}
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-orange-50">
      {/* Header */}
      <Header onSearch={handleSearch} categories={categories} />

      {/* Search Results or Normal Content */}
      {searchResults.length > 0 || isSearching ? (
        <div className="py-16">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-12"
            >
              <div className="inline-flex items-center gap-4 bg-gradient-to-r from-violet-600 to-orange-500 text-white rounded-3xl px-12 py-6 shadow-2xl mb-8">
                <TrendingUp size={32} />
                <h2 className="text-3xl font-black">
                  Resultados para "{searchQuery}"
                </h2>
              </div>
              <button
                onClick={clearSearch}
                className="bg-gradient-to-r from-violet-600 to-purple-600 text-white px-8 py-4 rounded-2xl font-bold hover:from-violet-700 hover:to-purple-700 transition-all duration-300 shadow-xl"
              >
                ← Volver al inicio
              </button>
            </motion.div>
            
            {isSearching ? (
              <div className="text-center py-20">
                <Loader2 className="mx-auto animate-spin text-violet-600 mb-6" size={64} />
                <p className="text-gray-700 text-2xl font-semibold">Buscando noticias...</p>
              </div>
            ) : (
              <NewsGrid 
                articles={searchResults} 
                title={`${searchResults.length} resultado${searchResults.length !== 1 ? 's' : ''} encontrado${searchResults.length !== 1 ? 's' : ''}`} 
              />
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

          {/* MEGA CALL TO ACTION */}
          <section className="py-20 bg-gradient-to-r from-violet-600 via-purple-600 to-orange-500 relative overflow-hidden">
            <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(255,255,255,0.1)_25%,transparent_25%,transparent_75%,rgba(255,255,255,0.1)_75%)] bg-[size:60px_60px] animate-pulse"></div>
            
            <div className="container mx-auto px-4 relative z-10">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="text-center"
              >
                <div className="w-32 h-32 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce">
                  <Radio className="text-white animate-pulse" size={64} />
                </div>
                
                <h2 className="text-6xl md:text-7xl font-black text-white mb-8 drop-shadow-2xl">
                  ¡ESCÚCHANOS EN VIVO!
                </h2>
                
                <p className="text-2xl text-white/90 mb-12 font-medium max-w-3xl mx-auto leading-relaxed">
                  La radio más escuchada de San Luis. Noticias, música y entretenimiento las 24 horas.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-white text-violet-600 px-12 py-6 rounded-3xl font-black text-2xl shadow-2xl hover:bg-gray-100 transition-all duration-300 flex items-center gap-4"
                  >
                    <Play size={32} className="fill-current" />
                    <span>REPRODUCIR AHORA</span>
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="border-4 border-white text-white px-12 py-6 rounded-3xl font-black text-2xl hover:bg-white hover:text-violet-600 transition-all duration-300 flex items-center gap-4"
                  >
                    <Heart size={32} />
                    <span>SEGUINOS</span>
                  </motion.button>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Quick Stats with VIBRANT COLORS */}
          {stats && <StatsSection stats={stats} />}

          {/* Categories Section - MEGA VERSION */}
          <section className="py-24 bg-gradient-to-br from-orange-100 via-violet-100 to-purple-100">
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center mb-20"
              >
                <div className="inline-flex items-center gap-4 bg-gradient-to-r from-violet-600 to-orange-500 text-white rounded-3xl px-12 py-6 mb-8 shadow-2xl">
                  <Newspaper size={48} />
                  <h2 className="text-5xl font-black">CATEGORÍAS</h2>
                </div>
                <p className="text-2xl text-gray-700 max-w-3xl mx-auto font-medium">
                  Descubre noticias organizadas por temas que te interesan
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {categories.map((category, index) => (
                  <motion.a
                    key={category.id}
                    href={`/categoria/${category.slug}`}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    whileHover={{ scale: 1.08, y: -12 }}
                    className="group relative overflow-hidden rounded-3xl aspect-square shadow-2xl hover:shadow-3xl transition-all duration-500"
                  >
                    {/* Background with gradient */}
                    <div 
                      className="absolute inset-0 bg-gradient-to-br opacity-95"
                      style={{ 
                        background: index % 2 === 0 
                          ? `linear-gradient(135deg, #7c3aed, #f97316)` 
                          : `linear-gradient(135deg, #ea580c, #8b5cf6)`
                      }}
                    />
                    
                    {/* Animated background */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.2),transparent_70%)] group-hover:animate-pulse" />
                    
                    {/* Content */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-8">
                      <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mb-6 group-hover:scale-125 transition-transform duration-500 shadow-xl">
                        <Newspaper size={40} />
                      </div>
                      <h3 className="font-black text-3xl text-center mb-4 group-hover:scale-110 transition-transform duration-300 drop-shadow-lg">
                        {category.name}
                      </h3>
                      <span className="text-xl font-bold bg-white/30 px-6 py-3 rounded-2xl backdrop-blur-sm">
                        {category.article_count} noticias
                      </span>
                    </div>
                    
                    {/* Shine effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  </motion.a>
                ))}
              </div>

              {/* MEGA BUTTON */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="text-center mt-16"
              >
                <motion.a
                  href="/noticias"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-4 bg-gradient-to-r from-violet-600 to-orange-500 text-white px-16 py-8 rounded-3xl font-black text-3xl shadow-2xl hover:shadow-3xl transition-all duration-300"
                >
                  <Flame size={40} />
                  <span>VER TODAS LAS NOTICIAS</span>
                  <ArrowRight size={40} />
                </motion.a>
              </motion.div>
            </div>
          </section>

          {/* Trending Section */}
          <TrendingSection articles={latestArticles.slice(0, 6)} />

          {/* All News Grid */}
          <section className="py-24 bg-gradient-to-br from-violet-50 to-orange-50">
            <div className="container mx-auto px-4">
              <NewsGrid 
                articles={allArticles} 
                title="🔥 ÚLTIMAS NOTICIAS CALIENTES 🔥"
                showLoadMore={true}
                onLoadMore={async () => {
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
            </div>
          </section>

          {/* Sponsors Section */}
          {sponsors.length > 0 && <SponsorsSection sponsors={sponsors} />}

          {/* FINAL MEGA CTA */}
          <section className="py-24 bg-gradient-to-r from-orange-500 via-violet-600 to-purple-600 relative overflow-hidden">
            <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(255,255,255,0.1)_25%,transparent_25%,transparent_75%,rgba(255,255,255,0.1)_75%)] bg-[size:80px_80px] animate-pulse"></div>
            
            <div className="container mx-auto px-4 relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center max-w-5xl mx-auto"
              >
                <div className="w-40 h-40 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-10 animate-bounce">
                  <Send className="text-white" size={80} />
                </div>
                
                <h2 className="text-6xl md:text-7xl font-black text-white mb-8 drop-shadow-2xl">
                  ¡NO TE PIERDAS NADA!
                </h2>
                
                <p className="text-3xl text-white/90 mb-12 font-bold leading-relaxed">
                  Suscríbete y recibe las noticias más importantes directo en tu email
                </p>
                
                <div className="flex flex-col lg:flex-row gap-8 justify-center items-center">
                  <motion.a
                    href="/newsletter"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-white text-violet-600 px-16 py-8 rounded-3xl font-black text-3xl shadow-2xl hover:bg-gray-100 transition-all duration-300 flex items-center gap-4"
                  >
                    <Send size={40} />
                    <span>SUSCRIBIRME YA</span>
                  </motion.a>
                  
                  <motion.a
                    href="/noticias"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="border-4 border-white text-white px-16 py-8 rounded-3xl font-black text-3xl hover:bg-white hover:text-violet-600 transition-all duration-300 flex items-center gap-4"
                  >
                    <Newspaper size={40} />
                    <span>LEER NOTICIAS</span>
                  </motion.a>
                </div>
              </motion.div>
            </div>
          </section>
        </>
      )}

      {/* Radio Player */}
      <RadioPlayer 
        streamUrl=""
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