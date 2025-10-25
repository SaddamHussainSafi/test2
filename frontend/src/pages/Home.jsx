import React from 'react';
import HeroSection from '../components/HeroSection';
import FeaturedPets from '../components/FeaturedPets';
import HowItWorks from '../components/HowItWorks';
import ShelterSpotlight from '../components/ShelterSpotlight';
import SuccessStories from '../components/SuccessStories';
import FinalCTA from '../components/FinalCTA';

export default function Home() {
  return (
    <div style={{ paddingTop: '60px' }}>
      <HeroSection />
      <FeaturedPets />
      <HowItWorks />
      <ShelterSpotlight />
      <SuccessStories />
      <FinalCTA />
    </div>
  );
}
