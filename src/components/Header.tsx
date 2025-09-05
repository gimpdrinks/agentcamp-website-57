
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AgentCampLogo from './AgentCampLogo';

const logoUrl = "/lovable-uploads/5afcc10d-c621-418f-b0d3-ab1fdb549b1b.png";

const Header = () => {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    console.log('Logo image failed to load:', logoUrl);
    setImageError(true);
  };

  const handleImageLoad = () => {
    console.log('Logo image loaded successfully:', logoUrl);
  };

  return (
    <header className="absolute top-0 left-0 right-0 z-50 p-4 sm:p-6 bg-background/20 backdrop-blur-sm border-b border-primary/20">
      <nav className="flex items-center justify-center max-w-7xl mx-auto">
        <Link to="/" className="cursor-pointer">
          {!imageError ? (
            <img 
              src={logoUrl} 
              alt="AgentCamp Logo" 
              className="h-12 w-auto" 
              onError={handleImageError}
              onLoad={handleImageLoad}
            />
          ) : (
            <AgentCampLogo size={32} />
          )}
        </Link>
      </nav>
    </header>
  );
};

export default Header;
