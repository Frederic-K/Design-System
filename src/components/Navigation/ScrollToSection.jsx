import React from 'react';

const ScrollToSection = ({ sectionId, children }) => {
  const scrollToSection = () => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <button onClick={scrollToSection}>
      {children}
    </button>
  );
};

export default ScrollToSection;


// // Exemple de composant utilisant ScrollToSection pour naviguer vers une section d'une page
// import React, { useState, useEffect } from 'react';

// const ExempleHeader = ({ links, className }) => {
//   const [isScrolled, setIsScrolled] = useState(false);

//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 50);
//     };

//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   const scrollToSection = (sectionId) => {
//     const element = document.getElementById(sectionId);
//     if (element) {
//       element.scrollIntoView({ behavior: 'smooth' });
//     }
//   };

//   return (
//     <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
//       isScrolled ? 'bg-white/95 backdrop-blur-sm shadow-lg' : 'bg-transparent'
//     } ${className}`}>
//       <nav className="container-max section-padding py-4">
//         <div className="flex items-center justify-between">
//           <div className="text-2xl font-bold text-gray-800">
//             Votre Logo
//           </div>
          
//           <div className="hidden md:flex space-x-8">
//             {links.map((link) => (
//               <button 
//                 key={link.id}
//                 onClick={() => scrollToSection(link.id)}
//                 className="text-gray-600 hover:text-mauve-600 transition-colors duration-200"
//               >
//                 {link.text}
//               </button>
//             ))}
//           </div>
//         </div>
//       </nav>
//     </header>
//   );
// };

// export default ExempleHeader

// // Dans la page principal : 
// import React from 'react';
// import ScrollableHeader from './path/to/ScrollableHeader';

// const App = () => {
//   const headerLinks = [
//     { id: 'about', text: 'À propos' },
//     { id: 'experience', text: 'Expériences' },
//     { id: 'skills', text: 'Compétences' },
//     { id: 'contact', text: 'Contact' }
//   ];

//   return (
//     <div>
//       <ScrollableHeader links={headerLinks} />
      
//       {/* Le reste de votre contenu */}
//       <section id="about">À propos content...</section>
//       <section id="experience">Expériences content...</section>
//       <section id="skills">Compétences content...</section>
//       <section id="contact">Contact content...</section>
//     </div>
//   );
// };

// export default App;