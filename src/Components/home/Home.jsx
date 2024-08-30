import React from 'react';
import './Home.css';
import Banner from '../baner/Banner';
import LandingAbout from '../Landing-About/LandingAbout';
import DiscoverAccommodation from '../discoverAccommodation/DiscoverAccommodation';
import WhyChooseUs from '../WhyChooseUs/WhyChooseUs';
import Reviews from '../reviews/Reviews';
import Footer from '../foooter/Footer';

export default function Home() {
  return (
    <div>
      <Banner title= 'The Beauty of Fancy Living' />
      <LandingAbout />
      <DiscoverAccommodation />
      <WhyChooseUs />
      <Reviews />
      <Footer />
    </div>
  )
}
