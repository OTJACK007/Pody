import React, { useState, useEffect } from 'react';
import { Play, Crown, Sparkles, Star } from 'lucide-react';
import VideoBackground from './VideoBackground';

const HeroSection = () => {
  const [currentTitle, setCurrentTitle] = useState(0);
  const titles = [
    "Get Smarter, faster, Without Wasting Time",
    "Stop Reading Books, Summarize Podcasts"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTitle((prev) => (prev === 0 ? 1 : 0));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const flags = [
    { country: 'USA', image: 'https://static.wixstatic.com/media/c67dd6_a4882c1010344b30922c23e626baf714~mv2.png' },
    { country: 'UK', image: 'https://static.wixstatic.com/media/c67dd6_2a4617a1f26249028eeb357ddcfbf2d0~mv2.png' },
    { country: 'France', image: 'https://static.wixstatic.com/media/c67dd6_6d61dc59e47b47d89b4edfdf83cdb608~mv2.png' },
    { country: 'Spain', image: 'https://static.wixstatic.com/media/c67dd6_f705d2b950704c50990390cd9e3dd732~mv2.png' },
    { country: 'Germany', image: 'https://static.wixstatic.com/media/c67dd6_c0cddb77907a4e6883e91c95f197d3fa~mv2.png' },
    { country: 'Russia', image: 'https://static.wixstatic.com/media/c67dd6_62e9768157ae4abd8543922462ac6b1e~mv2.png' },
    { country: 'Japan', image: 'https://static.wixstatic.com/media/c67dd6_f7079d18b87042f8ad70a98d17b27ff3~mv2.png' },
    { country: 'China', image: 'https://static.wixstatic.com/media/c67dd6_40f8140eaf8441cd9d3aa19107ed1be4~mv2.png' },
    { country: 'India', image: 'https://static.wixstatic.com/media/c67dd6_36192cdfdf5f4f0ca31b105cc21011c0~mv2.png' }
  ];

  return (
    <div className="relative w-full min-h-[85vh] overflow-hidden">
      <VideoBackground />
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/60 to-[#1A1A1A]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-end pb-24 md:pb-32">
          <div className="max-w-7xl">
            <div className="relative z-20">
              <span className="inline-block px-3 py-1 bg-secondary text-black text-sm rounded-full font-medium animate-pulse">
                Featured Today
              </span>
            </div>
            
            <div className="mt-4 md:mt-6 min-h-[120px] md:min-h-[140px] relative">
              {titles.map((title, index) => (
                <h1
                  key={title}
                  className="text-3xl sm:text-4xl md:text-6xl font-bold text-white absolute transition-all duration-500 leading-tight max-w-4xl"
                  style={{
                    opacity: currentTitle === index ? 1 : 0,
                    transform: `translateY(${currentTitle === index ? '0' : '20px'})`,
                    pointerEvents: currentTitle === index ? 'auto' : 'none',
                    lineHeight: '1.2',
                  }}
                >
                  {title}
                </h1>
              ))}
            </div>

            <p className="text-gray-200 font-bold max-w-2xl text-base md:text-lg leading-relaxed mt-2 md:mt-4">
              Skip the full episodes. Unlock the best podcast insights in minutes and build your knowledge library effortlessly.
            </p>

            <div className="mt-6 md:mt-8 space-y-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="w-full sm:w-auto group flex items-center justify-center space-x-2 px-8 py-4 bg-white text-black rounded-full hover:bg-gray-200 transition-all duration-300 transform hover:scale-105">
                  <Play className="w-5 h-5 group-hover:animate-pulse" />
                  <span>Watch Demo</span>
                </button>
                <button className="w-full sm:w-auto group flex items-center justify-center space-x-2 px-8 py-4 bg-secondary/80 text-white rounded-full hover:bg-secondary transition-all duration-300 transform hover:scale-105">
                  <Crown className="w-5 h-5 group-hover:animate-bounce" />
                  <span>Unlock all videos and features for $5</span>
                </button>
              </div>

              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <span className="text-white font-bold">Join +128 700 Insiders</span>
                  <div className="flex -space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                </div>

                <img 
                  src="https://static.wixstatic.com/shapes/c67dd6_f5c9198cb94242fdb9a91b9b9b9fc2c5.svg"
                  alt="Decorative element"
                  className="w-32 h-auto"
                />

                <div>
                  <span className="text-gray-300 font-medium block">All languages Available:</span>
                  <div className="flex flex-wrap items-center gap-4 mt-2">
                    {flags.map((flag) => (
                      <div 
                        key={flag.country}
                        className="group relative cursor-pointer transform hover:scale-110 transition-transform duration-200"
                      >
                        <img 
                          src={flag.image} 
                          alt={`${flag.country} flag`}
                          className="w-8 h-8 object-cover rounded-full ring-2 ring-white/20 hover:ring-white/50 transition-all"
                        />
                        <span className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                          {flag.country}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 right-8">
          <div className="flex items-center space-x-2 px-4 py-2 bg-primary rounded-lg shadow-lg animate-pulse">
            <Sparkles className="w-4 h-4 text-white" />
            <span className="text-white font-medium text-sm">Powered by AI</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;