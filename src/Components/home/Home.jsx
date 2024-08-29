import React from 'react';
import './Home.css';
import Banner from '../baner/Banner';
import LandingAbout from '../Landing-About/LandingAbout';
import DiscoverAccommodation from '../discoverAccommodation/DiscoverAccommodation';
import WhyChooseUs from '../WhyChooseUs/WhyChooseUs';

export default function Home() {
  return (
    <div>
      <Banner />
      <LandingAbout />
      <DiscoverAccommodation />
      <WhyChooseUs />
    </div>
  )
}
