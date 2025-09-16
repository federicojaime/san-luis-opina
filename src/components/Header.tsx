// src/components/Header.tsx
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Menu, X, Radio, Play, Pause } from 'lucide-react';
import { Category } from '@/types';
import { apiClient } from '@/lib/api';

interface HeaderProps {
  onSearch: (query: string) => void;
  categories: Category[];
}

export default function Header({ onSearch, categories }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery);
      setIsSearchOpen(false);
    }
  };

  const toggleRadio = () => {
    setIsPlaying(!isPlaying);
    // Aquí conectarás el reproductor de radio
  };

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200/50 shadow-lg"
    >
      {/* Top Bar */}
      <div className="bg-gradient-to-r from-slo-purple-600 to-slo-orange-500 text-white py-2">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center text-sm">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="flex items-center gap-4"
            >
              <span>🔴 En Vivo</span>
              <button
                onClick={toggleRadio}
                className="flex items-center gap-2 bg-white/20 hover:bg-white/30 px-3 py-1 rounded-full transition-all duration-300"
              >
                {isPlaying ? <Pause size={16} /> : <Play size={16} />}
                <Radio size={16} />
                <span>Radio San Luis Opina</span>
              </button>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="hidden md:block"
            >
              <span>📅 {new Date().toLocaleDateString('es-AR', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}</span>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center"
          >
            <Link href="/" className="flex items-center">
              <Image
                src="/assets/logo.png"
                alt="San Luis Opina"
                width={80}
                height={80}
                className="rounded-full shadow-xl border-2 border-white/50"
              />
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            <Link 
              href="/" 
              className="text-gray-700 hover:text-slo-purple-600 font-medium transition-colors duration-300"
            >
              Inicio
            </Link>
            {categories.slice(0, 5).map((category) => (
              <Link
                key={category.slug}
                href={`/categoria/${category.slug}`}
                className="text-gray-700 hover:text-slo-purple-600 font-medium transition-colors duration-300 relative group"
              >
                {category.name}
                <span 
                  className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-slo-purple-500 to-slo-orange-500 group-hover:w-full transition-all duration-300"
                ></span>
              </Link>
            ))}
          </nav>

          {/* Search & Mobile Menu */}
          <div className="flex items-center gap-4">
            {/* Search Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsSearchOpen(true)}
              className="p-2 rounded-full bg-gradient-to-r from-slo-purple-100 to-slo-orange-100 text-slo-purple-600 hover:from-slo-purple-200 hover:to-slo-orange-200 transition-all duration-300"
            >
              <Search size={20} />
            </motion.button>

            {/* Mobile Menu Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-full bg-gradient-to-r from-slo-purple-100 to-slo-orange-100 text-slo-purple-600"
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t border-gray-200"
          >
            <div className="container mx-auto px-4 py-4">
              <nav className="flex flex-col gap-4">
                <Link href="/" className="text-gray-700 hover:text-slo-purple-600 font-medium">
                  Inicio
                </Link>
                {categories.map((category) => (
                  <Link
                    key={category.slug}
                    href={`/categoria/${category.slug}`}
                    className="text-gray-700 hover:text-slo-purple-600 font-medium"
                  >
                    {category.name}
                  </Link>
                ))}
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search Modal */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setIsSearchOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-xl font-bold gradient-text mb-4">Buscar Noticias</h3>
              <form onSubmit={handleSearch}>
                <div className="relative">
                  <Search className="absolute left-3 top-3 text-gray-400" size={20} />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="¿Qué estás buscando?"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-slo-purple-500 focus:border-transparent outline-none"
                    autoFocus
                  />
                </div>
                <div className="flex gap-3 mt-4">
                  <button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-slo-purple-600 to-slo-orange-500 text-white py-3 rounded-xl font-medium hover:from-slo-purple-700 hover:to-slo-orange-600 transition-all duration-300"
                  >
                    Buscar
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsSearchOpen(false)}
                    className="px-6 py-3 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors duration-300"
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}