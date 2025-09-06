import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AIAgent from '@/components/AIAgent';
import { Testimonials } from '@/components/Testimonials';
import ParticleBackground from '@/components/ParticleBackground';
import QuestProgressBar from '@/components/QuestProgressBar';
import { AudioProvider, useAudio } from '@/context/AudioContext';
import FeaturesSection from '@/components/FeaturesSection';
import ProgramsSection from '@/components/ProgramsSection';
import FAQSection from '@/components/FAQSection';
import CallToActionSection from '@/components/CallToActionSection';
const heroImageUrl = "/lovable-uploads/685bcaac-f9a4-4fc3-b1c4-f524891fcd10.png";
const PageContent = () => {
  const scrollToCTA = () => {
    const ctaSection = document.querySelector('[data-section="cta"]');
    if (ctaSection) {
      ctaSection.scrollIntoView({
        behavior: 'smooth'
      });
    }
  };
  return <div className="flex flex-col min-h-screen bg-background h-screen overflow-y-auto snap-y snap-mandatory">
      <Header />
      <main className="flex-grow">
        <section className="relative flex items-center justify-center h-screen bg-cover bg-center snap-start" style={{
        backgroundImage: `url(${heroImageUrl})`
      }}>
          <div className="absolute inset-0 bg-black/70"></div>
          <div className="absolute inset-0 animate-subtle-flicker bg-gradient-to-br from-primary/10 via-transparent to-secondary/10"></div>
          <ParticleBackground />

          <div className="relative z-10 text-center text-white px-4 animate-in fade-in-0 slide-in-from-bottom-10 duration-1000">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 max-w-4xl mx-auto" style={{
            textShadow: '0 3px 10px rgba(0,0,0,0.8)'
          }}>Launch your AI-powered MVP. Fast. Fun. RPG style.</h1>

            <AIAgent />
          </div>
        </section>
        
        <FeaturesSection />
        <Testimonials />
        <ProgramsSection />
        <FAQSection />
        <div data-section="cta">
          <CallToActionSection />
        </div>
      </main>
      <Footer />
      <QuestProgressBar />
    </div>;
};
const Index = () => {
  return <AudioProvider>
      <PageContent />
    </AudioProvider>;
};
export default Index;