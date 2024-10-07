// import React from 'react';
// import './Home.css';
// import Banner from '../baner/Banner';
// import LandingAbout from '../Landing-About/LandingAbout';
// import DiscoverAccommodation from '../discoverAccommodation/DiscoverAccommodation';
// import WhyChooseUs from '../WhyChooseUs/WhyChooseUs';
// import Reviews from '../reviews/Reviews';
// import Footer from '../foooter/Footer';

// export default function Home() {
//   return (
//     <div>
//       <Banner title= 'The Beauty of Fancy Living' />
//       <LandingAbout />
//       <DiscoverAccommodation />
//       <WhyChooseUs />
//       <Reviews />
//       <Footer />
//     </div>
//   )
// }




import React, { useState, useEffect } from 'react';
import './Home.css';
import Banner from '../baner/Banner';
import LandingAbout from '../Landing-About/LandingAbout';
import DiscoverAccommodation from '../discoverAccommodation/DiscoverAccommodation';
import WhyChooseUs from '../WhyChooseUs/WhyChooseUs';
import Reviews from '../reviews/Reviews';
import Footer from '../foooter/Footer';
import Loader from '../loader/Loader';  // Make sure this path is correct

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);  // Adjust this time as needed

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div>
      <Banner title='The Beauty of Fancy Living' />
      <LandingAbout />
      <DiscoverAccommodation />
      <WhyChooseUs />
      <Reviews />
      <Footer />
    </div>
  )
}