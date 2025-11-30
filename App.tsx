
import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown, Instagram, Send, ChevronLeft, ChevronRight } from 'lucide-react';

// --- Types ---

interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

// --- Components ---

const FadeIn: React.FC<FadeInProps> = ({ children, delay = 0, className = "" }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.8, delay: delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const ParallaxBackground: React.FC = () => {
  const { scrollY } = useScroll();
  // Коэффициент параллакса: при скролле на 100px, фон двигается на 20px (0.2)
  const y = useTransform(scrollY, (value) => value * -0.2);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      <motion.div 
        style={{ y }} 
        className="w-full h-[180%] relative"
      >
        <img 
          src="/Texture 1.png" 
          alt="Background Texture" 
          className="w-full h-full object-cover"
        />
      </motion.div>
    </div>
  );
};

const ParallaxImage: React.FC<{ src: string; alt: string; className?: string }> = ({ src, alt, className = "" }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [imageError, setImageError] = React.useState(false);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <div ref={ref} className={`overflow-hidden relative ${className}`}>
      <motion.div style={{ y }} className="w-full h-[120%] relative -top-[10%]">
        {imageError ? (
          <div className="w-full h-full flex items-center justify-center bg-surface border border-white/10">
            <div className="text-center text-subtext text-xs">
              <p className="mb-2">Изображение не найдено</p>
              <p className="text-[10px] opacity-50">Проверьте: public/buddha.png</p>
            </div>
          </div>
        ) : (
          <img 
            src={src} 
            alt={alt} 
            className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity duration-700"
            onError={(e) => {
              console.error('Ошибка загрузки изображения:', src);
              console.error('Проверьте, что файл buddha.png находится в папке public');
              setImageError(true);
            }}
          />
        )}
      </motion.div>
      <div className="absolute inset-0 bg-background/10 mix-blend-multiply pointer-events-none" />
    </div>
  );
};

// --- Sections ---

const Header: React.FC = () => (
  <header className="fixed top-0 left-0 w-full z-40 flex justify-between items-center px-6 py-6 md:px-12 md:py-8 mix-blend-difference text-white">
    <div className="font-serif text-2xl font-bold tracking-tighter">rel!c</div>
    <nav className="hidden md:flex space-x-8 font-sans text-xs tracking-widest opacity-70">
      <a href="#philosophy" className="hover:opacity-100 transition-opacity">PHILOSOPHY</a>
      <a href="#artifact" className="hover:opacity-100 transition-opacity">ARTIFACT</a>
      <a href="#method" className="hover:opacity-100 transition-opacity">METHOD</a>
    </nav>
    <div className="md:hidden">
       <div className="w-6 h-0.5 bg-current mb-1"></div>
       <div className="w-6 h-0.5 bg-current"></div>
    </div>
  </header>
);

const Hero: React.FC = () => {
  return (
    <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden px-4">

      <motion.h1 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="font-serif text-[20vw] md:text-[15rem] leading-none text-text z-10 tracking-tighter select-none"
        style={{
          textShadow: '0 4px 16px rgba(0, 0, 0, 0.7), 0 2px 8px rgba(0, 0, 0, 0.6), 0 0 4px rgba(0, 0, 0, 0.9)',
          WebkitTextStroke: '1px rgba(234, 234, 234, 0.5)',
          textStroke: '1px rgba(234, 234, 234, 0.5)'
        }}
      >
        rel!c
      </motion.h1>
      
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="font-sans text-xs md:text-sm tracking-[0.3em] text-subtext mt-4 md:mt-8 text-center uppercase max-w-md z-10"
        style={{
          textShadow: '0 2px 8px rgba(0, 0, 0, 0.6), 0 1px 4px rgba(0, 0, 0, 0.5), 0 0 2px rgba(0, 0, 0, 0.8)',
          WebkitTextStroke: '0.5px rgba(160, 159, 157, 0.4)',
          textStroke: '0.5px rgba(160, 159, 157, 0.4)'
        }}
      >
        Мы не создаем искусство.<br className="md:hidden"/> Мы извлекаем его из пластов времени.
      </motion.p>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-12 z-10"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <ArrowDown className="w-4 h-4 text-subtext opacity-50" />
        </motion.div>
      </motion.div>
    </section>
  );
};

const Philosophy: React.FC = () => (
  <section id="philosophy" className="min-h-screen w-full flex flex-col items-center justify-center px-6 relative overflow-hidden">
    <FadeIn className="max-w-4xl text-center">
      <div className="space-y-8">
        <p className="font-serif text-2xl md:text-4xl italic leading-relaxed text-text opacity-90">
          "Шум современного мира заглушает голос интуиции.
          <br className="hidden md:block" />
          Мы теряем связь с глубиной, растворяясь в потоке информации.
        </p>
        <p className="font-serif text-2xl md:text-4xl italic leading-relaxed text-text opacity-90">
          Чтобы вернуться к себе, нужен якорь.
          <br />
          Материальный символ внутренней тишины."
        </p>
      </div>
    </FadeIn>
  </section>
);

const Artifact: React.FC = () => {
  const images = [
    '/buddha 1.png',
    '/buddha 2.png',
    '/buddha 3.png',
    '/buddha 4.png'
  ];
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <section id="artifact" className="min-h-screen w-full flex flex-col justify-center py-20 px-6 relative overflow-hidden">
      <div className="max-w-6xl mx-auto w-full">
        <FadeIn className="w-full">
          <div className="border-t border-white/10 mb-12 pt-4 flex justify-between items-end">
            <h2 className="font-serif text-3xl md:text-5xl">АРТЕФАКТ 001</h2>
            <span className="font-sans text-xs tracking-widest text-subtext hidden md:block">OBJECT: OBSERVER</span>
          </div>
        </FadeIn>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center w-full">
          <FadeIn delay={0.2} className="relative aspect-[3/4] bg-surface w-full overflow-hidden group">
            <img 
              src={images[currentIndex]} 
              alt={`Buddha head sculpture ${currentIndex + 1}`} 
              className="w-full h-full object-cover" 
            />
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              aria-label="Previous image"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              aria-label="Next image"
            >
              <ChevronRight size={20} />
            </button>
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex ? 'bg-white w-6' : 'bg-white/40 hover:bg-white/60'
                  }`}
                  aria-label={`Go to image ${index + 1}`}
                />
              ))}
            </div>
          </FadeIn>

        <div className="space-y-12">
          <FadeIn delay={0.3}>
            <h3 className="font-serif text-4xl md:text-6xl mb-6 text-accent">НАБЛЮДАТЕЛЬ</h3>
            <div className="font-sans text-xs md:text-sm text-subtext tracking-widest space-y-2 font-mono border-l border-white/20 pl-4">
              <p>МАТЕРИАЛ: СТРУКТУРНЫЙ БЕТОН, ПИГМЕНТЫ ЗЕМЛИ, РУЧНАЯ ФОРМОВКА.</p>
              <p>ФАКТУРА: ТАКТИЛЬНАЯ ШЕРОХОВАТОСТЬ КАМНЯ.</p>
              <p>ВЕС: 2.4 КГ</p>
            </div>
          </FadeIn>

          <FadeIn delay={0.4}>
            <p className="font-sans text-base md:text-lg leading-loose text-text/80">
              Это лицо не выражает эмоций. Оно выражает состояние до появления эмоций.
              Абсолютный ноль. Точка покоя.
            </p>
            <div className="h-6" />
            <p className="font-sans text-base md:text-lg leading-loose text-text/80">
              «Наблюдатель» не требует вашего внимания. Он возвращает вам ваше. Глядя на него, вы видите отражение собственной способности быть спокойным посреди шторма.
            </p>
          </FadeIn>
        </div>
      </div>
    </div>
    </section>
  );
};

const Method: React.FC = () => (
  <section id="method" className="py-32 relative overflow-hidden">
    
    <div className="relative container mx-auto px-6 md:px-12 lg:px-32">
      <FadeIn>
        <div className="max-w-2xl ml-auto bg-background/80 backdrop-blur-sm p-8 md:p-16 border border-white/5">
           <h4 className="font-sans text-xs tracking-[0.3em] text-accent mb-8 uppercase">Процесс</h4>
           <p className="font-serif text-xl md:text-2xl leading-relaxed mb-8">
             "В этом процессе нет места спешке или машинному идеалу.
             Каждый отлив — это непредсказуемая алхимия бетона и случая. Я задаю форму, но фактуру создает сама природа материала."
           </p>
           <p className="font-sans text-sm md:text-base text-subtext leading-relaxed">
             Каверны, сколы, перепады цвета — это не дефекты. Это «шрамы времени», которые делают каждый артефакт живым и единственным в своем роде. Я не исправляю их, я позволяю им быть.
           </p>
        </div>
      </FadeIn>
    </div>
  </section>
);

const Ritual: React.FC = () => (
  <section className="py-40 px-6 flex flex-col items-center justify-center text-center bg-surface/30">
    <FadeIn>
      <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl text-accent mb-8 max-w-4xl leading-tight">
        "Создай свой ритуал. <br/>
        Поставь <span className="font-bold">rel!c</span> там, где ты хочешь чувствовать тишину."
      </h2>
    </FadeIn>
  </section>
);

const Acquisition: React.FC = () => (
  <section className="py-32 px-6 border-t border-white/5">
    <div className="max-w-xl mx-auto text-center">
      <FadeIn>
        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/30 to-transparent mb-12"></div>
        <p className="font-sans text-subtext text-sm md:text-base mb-8 tracking-wide">
          Ручная работа ограничивает тираж. Стать обладателем артефакта:
        </p>
        
        <button className="group relative px-8 py-4 bg-transparent border border-white/20 hover:border-white/60 transition-colors duration-500 overflow-hidden">
          <span className="relative z-10 font-sans text-xs md:text-sm tracking-[0.2em] uppercase text-text group-hover:text-white transition-colors">
            [ Лист ожидания ]
          </span>
          <div className="absolute inset-0 bg-white/5 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500 ease-out"></div>
        </button>
      </FadeIn>
    </div>
  </section>
);

const Footer: React.FC = () => (
  <footer className="py-12 px-6 md:px-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-subtext font-sans text-xs uppercase tracking-widest">
    <div className="mb-4 md:mb-0">
      rel!c © 2025. Artifacts of the mind.
    </div>
    <div className="flex space-x-8">
      <a href="#" className="hover:text-white transition-colors flex items-center gap-2">
        Instagram <Instagram size={14} />
      </a>
      <a href="#" className="hover:text-white transition-colors flex items-center gap-2">
        Telegram <Send size={14} />
      </a>
    </div>
  </footer>
);

// --- Main App ---

const App: React.FC = () => {
  return (
    <div className="min-h-screen text-text selection:bg-accent selection:text-background relative">
      <ParallaxBackground />
      <div className="relative z-10">
        <Header />
        <main>
          <Hero />
          <Philosophy />
          <Artifact />
          <Method />
          <Ritual />
          <Acquisition />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default App;
