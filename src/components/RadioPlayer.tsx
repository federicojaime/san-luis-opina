// src/components/RadioPlayer.tsx
'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, Radio, Minimize2, Maximize2 } from 'lucide-react';
import Image from 'next/image';

interface RadioPlayerProps {
  // Estas props las configurarás cuando tengas los datos del stream
  streamUrl?: string;
  stationName?: string;
  currentShow?: string;
  isLive?: boolean;
}

export default function RadioPlayer({ 
  streamUrl = '', // Aquí pondrás tu URL de stream
  stationName = 'Radio San Luis Opina',
  currentShow = 'Programa en Vivo',
  isLive = true 
}: RadioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(console.error);
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  return (
    <>
      {/* Floating Radio Player */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1, duration: 0.8, ease: "easeOut" }}
        className={`fixed bottom-6 right-6 z-40 ${isMinimized ? 'w-16 h-16' : 'w-80'}`}
      >
        <AnimatePresence mode="wait">
          {isMinimized ? (
            /* Minimized Player */
            <motion.div
              key="minimized"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="bg-gradient-to-r from-slo-purple-600 to-slo-orange-500 rounded-full shadow-2xl cursor-pointer"
              onClick={() => setIsMinimized(false)}
            >
              <div className="w-16 h-16 flex items-center justify-center relative">
                {isPlaying ? (
                  <Pause className="text-white" size={20} />
                ) : (
                  <Play className="text-white ml-1" size={20} />
                )}
                {isLive && (
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full animate-pulse"></div>
                )}
              </div>
            </motion.div>
          ) : (
            /* Full Player */
            <motion.div
              key="full"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl border border-gray-200/50 overflow-hidden"
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-slo-purple-600 to-slo-orange-500 p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <Radio className="text-white" size={20} />
                      {isLive && (
                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                      )}
                    </div>
                    {isLive && (
                      <span className="text-xs bg-red-500 px-2 py-1 rounded-full text-white font-bold">EN VIVO</span>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setIsExpanded(!isExpanded)}
                      className="text-white/80 hover:text-white transition-colors"
                    >
                      {isExpanded ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
                    </button>
                    <button
                      onClick={() => setIsMinimized(true)}
                      className="text-white/80 hover:text-white transition-colors"
                    >
                      <Minimize2 size={16} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Player Body */}
              <div className="p-4">
                {/* Current Show */}
                <div className="text-center mb-4">
                  <div className="w-32 h-32 mx-auto mb-3 rounded-full overflow-hidden shadow-lg  bg-white">
                    <Image
                      src="/assets/logo.png"
                      alt="Logo"
                      width={112}
                      height={112}
                      className="object-cover w-full h-full rounded-full"
                    />
                  </div>
                  <h5 className="font-bold text-gray-900">{currentShow}</h5>
                  <p className="text-sm text-gray-500">Ahora en el aire</p>
                </div>

                {/* Controls */}
                <div className="flex items-center justify-center gap-4 mb-4">
                  <button
                    onClick={togglePlay}
                    className="w-12 h-12 bg-gradient-to-r from-slo-purple-600 to-slo-orange-500 rounded-full flex items-center justify-center text-white hover:from-slo-purple-700 hover:to-slo-orange-600 transition-all duration-300 shadow-lg"
                  >
                    {isPlaying ? <Pause size={20} /> : <Play size={20} className="ml-1" />}
                  </button>
                </div>

                {/* Volume Control */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={toggleMute}
                    className="text-gray-600 hover:text-slo-purple-600 transition-colors"
                  >
                    {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                  </button>
                  
                  <div className="flex-1 relative">
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.1"
                      value={volume}
                      onChange={handleVolumeChange}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                      style={{
                        background: `linear-gradient(to right, #7c3aed 0%, #f97316 ${volume * 100}%, #e5e7eb ${volume * 100}%, #e5e7eb 100%)`
                      }}
                    />
                  </div>
                  
                  <span className="text-xs text-gray-500 w-8">
                    {Math.round(volume * 100)}%
                  </span>
                </div>

                {/* Expanded Info */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="mt-4 pt-4 border-t border-gray-200"
                    >
                      <div className="text-center space-y-2">
                        <p className="text-sm text-gray-600">
                          📻 Escuchando desde San Luis, Argentina
                        </p>
                        <p className="text-xs text-gray-500">
                          La mejor información local, las 24 horas
                        </p>
                        <div className="flex justify-center gap-2 mt-3">
                          <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                            ✓ Conectado
                          </span>
                          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                            HD Audio
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Hidden Audio Element */}
      {streamUrl && (
        <audio
          ref={audioRef}
          src={streamUrl}
          preload="none"
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onError={(e) => {
            console.error('Error loading audio stream:', e);
            setIsPlaying(false);
          }}
        />
      )}
    </>
  );
}