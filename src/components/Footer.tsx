// src/components/Footer.tsx
'use client';

import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter, Youtube, Heart } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import Newsletter from './Newsletter';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-slo-purple-900 to-gray-900 text-white">
      {/* Newsletter Section */}
      <Newsletter variant="footer" />

      {/* Main Footer */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            
            {/* Logo & Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-2"
            >
              <div className="flex justify-center lg:justify-start mb-6">
                <Image
                  src="/assets/logo.png"
                  alt="San Luis Opina"
                  width={100}
                  height={100}
                  className="rounded-full shadow-xl border-4 border-white/20"
                />
              </div>
              
              <p className="text-gray-300 mb-6 leading-relaxed">
                Tu fuente confiable de noticias locales en San Luis. Mantente informado 
                con las últimas novedades de tu ciudad, provincia y región.
              </p>
              
              {/* Social Media */}
              <div className="flex gap-4">
                {[
                  { icon: Facebook, href: '#', label: 'Facebook' },
                  { icon: Instagram, href: '#', label: 'Instagram' },
                  { icon: Twitter, href: '#', label: 'Twitter' },
                  { icon: Youtube, href: '#', label: 'YouTube' },
                ].map(({ icon: Icon, href, label }) => (
                  <motion.a
                    key={label}
                    href={href}
                    whileHover={{ scale: 1.1, y: -2 }}
                    className="w-10 h-10 bg-gradient-to-r from-slo-purple-600 to-slo-orange-500 rounded-full flex items-center justify-center hover:shadow-lg transition-all duration-300"
                  >
                    <Icon size={18} />
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h5 className="text-lg font-bold mb-6 gradient-text">Enlaces Rápidos</h5>
              <ul className="space-y-3">
                {[
                  { name: 'Inicio', href: '/' },
                  { name: 'Noticias', href: '/noticias' },
                  { name: 'Política', href: '/categoria/politica' },
                  { name: 'Deportes', href: '/categoria/deportes' },
                  { name: 'Cultura', href: '/categoria/cultura' },
                  { name: 'Contacto', href: '/contacto' },
                ].map((link) => (
                  <li key={link.name}>
                    <Link 
                      href={link.href}
                      className="text-gray-300 hover:text-slo-orange-400 transition-colors duration-300"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h5 className="text-lg font-bold mb-6 gradient-text">Contacto</h5>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <MapPin size={18} className="text-slo-orange-400 flex-shrink-0" />
                  <p className="text-gray-300 text-sm">
                    San Luis, Argentina
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <Phone size={18} className="text-slo-orange-400 flex-shrink-0" />
                  <p className="text-gray-300 text-sm">
                    +54 (266) 123-4567
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <Mail size={18} className="text-slo-orange-400 flex-shrink-0" />
                  <p className="text-gray-300 text-sm">
                    info@sanluisopina.com
                  </p>
                </div>
              </div>

              {/* Live Indicator */}
              <div className="mt-6 p-3 bg-gradient-to-r from-red-600/20 to-orange-600/20 rounded-xl border border-red-500/30">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium">En vivo las 24hs</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700">
        <div className="container mx-auto px-4 py-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col md:flex-row items-center justify-between gap-4"
          >
            <p className="text-gray-400 text-sm text-center md:text-left">
              © 2025 San Luis Opina. Todos los derechos reservados.
            </p>
            
            <div className="flex items-center gap-2 text-gray-400 text-sm">
              <span>Hecho con</span>
              <Heart size={16} className="text-red-500 animate-pulse" />
              <span>en San Luis</span>
            </div>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}