// import React from "react";

// const AboutUs: React.FC = () => {
//   return (
//     <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      
//       {/* Header */}
//       <section className="py-16 px-6 text-center">
//         <h1 className="text-4xl font-extrabold mb-4 text-red-600 dark:text-red-400">
//           About Fancy Top Covers
//         </h1>
//         <p className="text-gray-700 dark:text-gray-300 text-lg max-w-2xl mx-auto">
//           Premium top covers designed to protect and style your furniture with elegance and comfort.
//         </p>
//       </section>

//       {/* Our Story */}
//       <section className="py-12 px-6 max-w-4xl mx-auto">
//         <h2 className="text-2xl font-bold mb-4 text-red-600 dark:text-red-400">
//           Our Story
//         </h2>
//         <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
//           Fancy Top Covers started with a vision to provide durable and stylish furniture covers
//           that elevate homes. Every product is crafted with attention to detail, combining
//           practicality with design aesthetics.
//         </p>
//       </section>

//       {/* Mission */}
//       <section className="py-12 px-6 max-w-4xl mx-auto">
//         <h2 className="text-2xl font-bold mb-4 text-red-600 dark:text-red-400">
//           Our Mission
//         </h2>
//         <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
//           Our mission is to provide top-quality, stylish covers that combine durability
//           with elegance, ensuring a perfect fit for every lifestyle.
//         </p>
//       </section>

//       {/* Team */}
//       {/* <section className="py-12 px-6 max-w-5xl mx-auto">
//         <h2 className="text-2xl font-bold mb-8 text-red-600 dark:text-red-400 text-center">
//           Meet the Team
//         </h2>
//         <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
//           <div className="text-center">
//             <div className="w-24 h-24 mx-auto rounded-full overflow-hidden mb-2 border-2 border-red-600">
//               <img src="/team/member1.jpg" alt="Team Member" className="w-full h-full object-cover" />
//             </div>
//             <h3 className="font-medium">Muhammad Noman</h3>
//             <p className="text-gray-600 dark:text-gray-400 text-sm">Founder & CEO</p>
//           </div>
//           <div className="text-center">
//             <div className="w-24 h-24 mx-auto rounded-full overflow-hidden mb-2 border-2 border-red-600">
//               <img src="/team/member2.jpg" alt="Team Member" className="w-full h-full object-cover" />
//             </div>
//             <h3 className="font-medium">Jane Doe</h3>
//             <p className="text-gray-600 dark:text-gray-400 text-sm">Head of Design</p>
//           </div>
//         </div>
//       </section> */}

//     </div>
//   );
// };

// export default AboutUs;






// 2nd about us
import React from "react";

const AboutUs: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-gray-100 transition-colors duration-300 px-6 py-12">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
            About TopCovers
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Premium mobile accessories designed to protect your devices with style and sophistication
          </p>
        </div>

        {/* Hero Section */}
        <div className="grid md:grid-cols-2 gap-12 mb-20 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">Our Story</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
              TopCovers began with a simple vision: to create mobile accessories that combine exceptional protection with 
              stunning design. What started as a small passion project has grown into a trusted brand known for quality and 
              innovation in the mobile accessories market.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Every product we create is crafted with meticulous attention to detail, ensuring that your devices are not only 
              protected but also make a style statement. We believe that your mobile accessories should reflect your personality 
              while providing the ultimate protection for your valuable devices.
            </p>
          </div>
          <div className="rounded-xl overflow-hidden shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1616077168079-7e09a677fb2c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
              alt="TopCovers products" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Mission & Values */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
            <div className="w-14 h-14 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Our Mission</h3>
            <p className="text-gray-600 dark:text-gray-300">
              To provide premium quality mobile covers that offer superior protection while enhancing the aesthetic appeal of your devices.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
            <div className="w-14 h-14 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Our Vision</h3>
            <p className="text-gray-600 dark:text-gray-300">
              To become the most trusted brand for mobile accessories, known for innovation, quality, and customer satisfaction.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
            <div className="w-14 h-14 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Our Values</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Quality, innovation, customer satisfaction, and sustainability are at the core of everything we do.
            </p>
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800 dark:text-white">Meet Our Team</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
              <div className="w-32 h-32 mx-auto rounded-full overflow-hidden mb-4 border-4 border-red-100 dark:border-red-900/30">
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" 
                  alt="Muhammad Noman" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-bold text-lg mb-1 text-gray-800 dark:text-white">Muhammad Noman</h3>
              <p className="text-red-600 mb-3">Founder & CEO</p>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                With over 10 years of experience in the mobile accessories industry, Noman leads our vision and strategy.
              </p>
            </div>

            <div className="text-center bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
              <div className="w-32 h-32 mx-auto rounded-full overflow-hidden mb-4 border-4 border-red-100 dark:border-red-900/30">
                <img 
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" 
                  alt="Sarah Johnson" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-bold text-lg mb-1 text-gray-800 dark:text-white">Sarah Johnson</h3>
              <p className="text-red-600 mb-3">Head of Design</p>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Sarah brings creative vision to our products, ensuring they are both stylish and functional.
              </p>
            </div>

            <div className="text-center bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
              <div className="w-32 h-32 mx-auto rounded-full overflow-hidden mb-4 border-4 border-red-100 dark:border-red-900/30">
                <img 
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" 
                  alt="David Chen" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-bold text-lg mb-1 text-gray-800 dark:text-white">David Chen</h3>
              <p className="text-red-600 mb-3">Product Engineer</p>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                David ensures our products meet the highest standards of quality and durability.
              </p>
            </div>

            <div className="text-center bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
              <div className="w-32 h-32 mx-auto rounded-full overflow-hidden mb-4 border-4 border-red-100 dark:border-red-900/30">
                <img 
                  src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" 
                  alt="Aisha Khan" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-bold text-lg mb-1 text-gray-800 dark:text-white">Aisha Khan</h3>
              <p className="text-red-600 mb-3">Customer Success Manager</p>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Aisha ensures our customers have the best experience from purchase to after-sales support.
              </p>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-gradient-to-r from-red-600 to-pink-600 rounded-2xl p-8 text-white text-center mb-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div>
              <div className="text-4xl font-bold mb-2">50K+</div>
              <div className="text-sm">Happy Customers</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">100+</div>
              <div className="text-sm">Products</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">15+</div>
              <div className="text-sm">Countries</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">98%</div>
              <div className="text-sm">Satisfaction Rate</div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">Join the TopCovers Family</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Discover our premium collection of mobile covers and accessories designed to protect your device in style.
          </p>
          <button className="bg-gradient-to-r from-red-600 to-pink-600 text-white font-semibold py-3 px-8 rounded-full hover:from-red-700 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-xl">
            Shop Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;